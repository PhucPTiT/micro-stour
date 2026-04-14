import { lazy, Suspense } from "react"
import {
  CalendarDays,
  LayoutDashboard,
  PlaneTakeoff,
  type LucideIcon,
} from "lucide-react"
import { NavLink, Outlet, Route, Routes } from "react-router-dom"
import { cn } from "@workspace/ui/lib/utils"

const BookingModule = lazy(() => import("booking/App"))

type NavigationItem = {
  to: string
  label: string
  description: string
  icon: LucideIcon
  end?: boolean
}

const navigationItems: NavigationItem[] = [
  {
    to: "/",
    label: "Dashboard",
    description: "Shell home",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/booking",
    label: "Booking",
    description: "Remote micro app",
    icon: CalendarDays,
  },
]

function ShellLayout() {
  return (
    <div className="bg-background text-foreground min-h-svh">
      <div className="grid min-h-svh lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-border bg-sidebar/70 border-r px-5 py-6 backdrop-blur">
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-2xl">
              <PlaneTakeoff className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">micro-stour</p>
              <p className="text-muted-foreground text-xs">
                Shell application
              </p>
            </div>
          </div>

          <nav className="space-y-2">
            {navigationItems.map(({ to, label, description, icon: Icon, end }) => (
              <NavLink
                key={to}
                className={({ isActive }) =>
                  cn(
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-start gap-3 rounded-2xl px-4 py-3 transition-colors",
                    isActive &&
                      "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                  )
                }
                end={end}
                to={to}
              >
                <Icon className="mt-0.5 size-4 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{label}</span>
                  <span className="block text-xs opacity-75">{description}</span>
                </span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="flex min-h-svh flex-col">
          <header className="bg-background/85 border-border sticky top-0 z-10 flex min-h-18 items-center justify-between border-b px-6 backdrop-blur">
            <div>
              <p className="text-sm font-semibold">Micro frontend shell</p>
              <p className="text-muted-foreground text-sm">
                Header and sidebar stay mounted while routes switch.
              </p>
            </div>
            <div className="text-muted-foreground text-xs">
              Press <kbd>d</kbd> to toggle theme
            </div>
          </header>

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.25fr_0.95fr]">
      <div className="from-card to-muted/50 rounded-3xl border bg-gradient-to-br p-6">
        <p className="text-muted-foreground mb-2 text-sm font-medium">
          Shell route
        </p>
        <h1 className="mb-3 text-3xl font-semibold tracking-tight">
          Shared layout stays mounted in the shell app.
        </h1>
        <p className="text-muted-foreground max-w-2xl text-sm leading-6">
          Clicking items in the sidebar only swaps the main content area.
          Both local and remote routes keep the same header and sidebar.
        </p>
      </div>

      <div className="bg-card rounded-3xl border p-6">
        <p className="mb-4 text-sm font-semibold">How it works</p>
        <div className="space-y-3 text-sm leading-6">
          <p>
            `web` acts as the shell and owns the router plus the shared chrome.
          </p>
          <p>
            Route `/booking` loads a micro app from a separate remote via module
            federation.
          </p>
          <p className="text-muted-foreground">
            The remote renders only feature content, so it inherits the shell
            layout automatically.
          </p>
        </div>
      </div>
    </section>
  )
}

function BookingRoute() {
  return (
    <Suspense
      fallback={
        <div className="bg-card rounded-3xl border p-6 text-sm">
          Loading booking micro app...
        </div>
      }
    >
      <BookingModule />
    </Suspense>
  )
}

export function App() {
  return (
    <Routes>
      <Route element={<ShellLayout />}>
        <Route element={<HomePage />} path="/" />
        <Route element={<BookingRoute />} path="/booking" />
      </Route>
    </Routes>
  )
}
