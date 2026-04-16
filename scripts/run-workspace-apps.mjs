import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const workspaceRoot = process.cwd();
const appsDir = path.join(workspaceRoot, "apps");
const ignoredTemplates = new Set(["shell-base", "module-base"]);

function isShellApp(appDirectoryName, packageName) {
    return appDirectoryName.includes("shell") || packageName.includes("shell");
}

async function getRunnableApps() {
    const appDirectories = await fs.readdir(appsDir, { withFileTypes: true });
    const runnableApps = [];

    for (const entry of appDirectories) {
        if (!entry.isDirectory() || ignoredTemplates.has(entry.name)) {
            continue;
        }

        const packageJsonPath = path.join(appsDir, entry.name, "package.json");

        try {
            const packageJsonRaw = await fs.readFile(packageJsonPath, "utf8");
            const packageJson = JSON.parse(packageJsonRaw);
            const packageName = packageJson.name;
            const scripts = packageJson.scripts ?? {};

            const scriptName =
                isShellApp(entry.name, packageName) || !scripts["dev:federation"]
                    ? "dev"
                    : "dev:federation";

            if (!scripts[scriptName]) {
                continue;
            }

            runnableApps.push({
                appDirectoryName: entry.name,
                packageName,
                scriptName,
            });
        } catch (error) {
            if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
                continue;
            }

            throw error;
        }
    }

    return runnableApps;
}

async function main() {
    const runnableApps = await getRunnableApps();

    if (runnableApps.length === 0) {
        console.log('No runnable apps found. Create one with "pnpm create:app".');
        return;
    }

    const childProcesses = runnableApps.map(({ packageName, appDirectoryName, scriptName }) => {
        const childProcess = spawn("pnpm", ["--filter", packageName, scriptName], {
            cwd: workspaceRoot,
            shell: true,
            stdio: "pipe",
        });

        const prefix = `[${appDirectoryName}]`;

        childProcess.stdout.on("data", (data) => {
            process.stdout.write(`${prefix} ${data}`);
        });

        childProcess.stderr.on("data", (data) => {
            process.stderr.write(`${prefix} ${data}`);
        });

        return childProcess;
    });

    let exiting = false;

    const shutdown = (exitCode = 0) => {
        if (exiting) {
            return;
        }

        exiting = true;

        for (const childProcess of childProcesses) {
            if (!childProcess.killed) {
                childProcess.kill();
            }
        }

        process.exitCode = exitCode;
    };

    for (const childProcess of childProcesses) {
        childProcess.on("exit", (code) => {
            if (code && code !== 0) {
                shutdown(code);
            }
        });
    }

    process.on("SIGINT", () => shutdown(0));
    process.on("SIGTERM", () => shutdown(0));
}

main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
});
