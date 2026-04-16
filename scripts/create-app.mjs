import fs from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const workspaceRoot = process.cwd();
const appsDir = path.join(workspaceRoot, "apps");
const templates = {
    shell: "shell-base",
    module: "module-base",
};

function sanitizeAppName(value) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

async function copyTemplateDirectory(sourceDir, targetDir) {
    await fs.cp(sourceDir, targetDir, {
        recursive: true,
        filter: (source) => {
            const relativePath = path.relative(sourceDir, source);

            if (!relativePath) {
                return true;
            }

            const ignoredPaths = ["node_modules", "dist", ".turbo"];

            return !ignoredPaths.some((ignoredPath) => relativePath.split(path.sep).includes(ignoredPath));
        },
    });
}

async function updateJsonFile(filePath, updater) {
    const rawContent = await fs.readFile(filePath, "utf8");
    const parsedContent = JSON.parse(rawContent);
    const nextContent = updater(parsedContent);

    await fs.writeFile(filePath, `${JSON.stringify(nextContent, null, 4)}\n`, "utf8");
}

async function replaceInFile(filePath, searchValue, replaceValue) {
    try {
        const fileContent = await fs.readFile(filePath, "utf8");
        const nextContent = fileContent.replace(searchValue, replaceValue);

        await fs.writeFile(filePath, nextContent, "utf8");
    } catch (error) {
        if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
            return;
        }

        throw error;
    }
}

async function main() {
    const cli = readline.createInterface({ input, output });

    try {
        const templateAnswer = (
            await cli.question("Choose template (shell/module): ")
        )
            .trim()
            .toLowerCase();

        const templateFolder = templates[templateAnswer];

        if (!templateFolder) {
            throw new Error('Template must be either "shell" or "module".');
        }

        const appNameAnswer = await cli.question("Enter new app name: ");
        const appName = sanitizeAppName(appNameAnswer);

        if (!appName) {
            throw new Error("App name is required.");
        }

        if (Object.values(templates).includes(appName)) {
            throw new Error("App name cannot reuse a base template name.");
        }

        const sourceDir = path.join(appsDir, templateFolder);
        const targetDir = path.join(appsDir, appName);

        try {
            await fs.access(targetDir);
            throw new Error(`App "${appName}" already exists.`);
        } catch (error) {
            if (!(error && typeof error === "object" && "code" in error && error.code === "ENOENT")) {
                throw error;
            }
        }

        await copyTemplateDirectory(sourceDir, targetDir);

        await updateJsonFile(path.join(targetDir, "package.json"), (packageJson) => ({
            ...packageJson,
            name: appName,
        }));

        await replaceInFile(
            path.join(targetDir, "vite.config.ts"),
            /name:\s*"shell"/,
            `name: "${appName}"`,
        );

        await replaceInFile(
            path.join(targetDir, "vite.config.ts"),
            /name:\s*"module"/,
            `name: "${appName}"`,
        );

        await replaceInFile(
            path.join(targetDir, "index.html"),
            /<title>.*<\/title>/,
            `<title>${appName}</title>`,
        );

        console.log(`Created app "${appName}" from template "${templateFolder}".`);
        console.log(`Location: ${targetDir}`);
    } finally {
        cli.close();
    }
}

main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
});
