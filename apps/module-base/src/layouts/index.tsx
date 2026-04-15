import type React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const isLoginPage = window.location.pathname.includes("login");

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="bg-background min-h-svh">
            <div className="flex min-h-svh">
                {/* Fake Sidebar */}
                <aside className="bg-card hidden w-64 shrink-0 border-r p-4 md:block">
                    <p className="text-muted-foreground text-sm font-semibold">Shell Sidebar (Fake)</p>

                    <div className="mt-4 space-y-2 text-sm">
                        <div className="bg-muted rounded-lg px-3 py-2">Dashboard</div>
                        <div className="bg-muted rounded-lg px-3 py-2">Booking</div>
                    </div>
                </aside>

                {/* Main */}
                <div className="flex flex-1 flex-col">
                    {/* Fake Header */}
                    <header className="bg-card flex h-16 items-center border-b px-6">
                        <p className="text-muted-foreground text-sm font-medium">Shell Header (Fake)</p>
                    </header>

                    {/* Content */}
                    <main className="flex-1 p-6">{children}</main>
                </div>
            </div>
        </div>
    );
}
