import { isRouteErrorResponse, useRouteError } from "react-router-dom";

type ErrorStateProps = {
    message: string;
};

function getErrorMessage(error: unknown) {
    if (isRouteErrorResponse(error)) {
        return error.statusText || "A route error occurred.";
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Something went wrong while rendering this module.";
}

export function ErrorState({ message }: ErrorStateProps) {
    return (
        <div className="bg-card flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-3xl border px-6 py-12 text-center">
            <span className="text-destructive text-sm font-semibold uppercase tracking-[0.24em]">Module error</span>
            <h1 className="text-3xl font-semibold tracking-tight">Something went wrong</h1>
            <p className="text-muted-foreground max-w-xl text-sm leading-6">{message}</p>
        </div>
    );
}

export default function ErrorPage() {
    const error = useRouteError();

    return <ErrorState message={getErrorMessage(error)} />;
}
