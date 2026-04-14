import { ChartNoAxesColumn, MapPinned, TicketCheck } from "lucide-react"

const quickStats = [
  { label: "Bookings today", value: "128", icon: TicketCheck },
  { label: "Active tours", value: "24", icon: MapPinned },
  { label: "Conversion", value: "18.6%", icon: ChartNoAxesColumn },
] as const

const upcomingTours = [
  {
    name: "Ha Long Signature Cruise",
    departure: "08:00",
    seats: "12 seats left",
  },
  {
    name: "Da Nang Discovery",
    departure: "10:30",
    seats: "7 seats left",
  },
  {
    name: "Mekong Riverside Escape",
    departure: "14:00",
    seats: "22 seats left",
  },
] as const

export default function App() {
  return (
    <section className="space-y-6">
      <div className="from-primary/12 via-background to-background rounded-3xl border bg-gradient-to-br p-6">
        <p className="text-muted-foreground mb-2 text-sm font-medium">
          Remote route
        </p>
        <h2 className="mb-3 text-3xl font-semibold tracking-tight">
          Booking micro app
        </h2>
        <p className="text-muted-foreground max-w-2xl text-sm leading-6">
          This module is mounted from the `booking` app but renders inside the
          shell content area, so the shared layout still stays in place.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {quickStats.map(({ label, value, icon: Icon }) => (
          <article className="bg-card rounded-3xl border p-5" key={label}>
            <div className="mb-5 flex items-center justify-between">
              <span className="text-muted-foreground text-sm">{label}</span>
              <Icon className="text-primary size-4" />
            </div>
            <p className="text-3xl font-semibold tracking-tight">{value}</p>
          </article>
        ))}
      </div>

      <div className="bg-card rounded-3xl border p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Upcoming departures</p>
            <p className="text-muted-foreground text-sm">
              Standalone module content served from remote app
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {upcomingTours.map((tour) => (
            <div
              className="bg-muted/40 flex items-center justify-between rounded-2xl px-4 py-4"
              key={tour.name}
            >
              <div>
                <p className="font-medium">{tour.name}</p>
                <p className="text-muted-foreground text-sm">
                  Departure {tour.departure}
                </p>
              </div>
              <span className="bg-background rounded-full border px-3 py-1 text-xs font-medium">
                {tour.seats}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
