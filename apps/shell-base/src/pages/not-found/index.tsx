import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="bg-card flex min-h-[360px] flex-col items-center justify-center gap-4 rounded-3xl border px-6 py-12 text-center">
            <span className="text-muted-foreground text-sm font-semibold uppercase tracking-[0.24em]">404</span>
            <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
            <p className="text-muted-foreground max-w-xl text-sm leading-6">
                The page you requested does not exist in the shell application.
            </p>
            <Link className="bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-medium" to="/">
                Back to home
            </Link>
        </div>
    );
}
