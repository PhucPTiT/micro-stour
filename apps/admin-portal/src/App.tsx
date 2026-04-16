import { ErrorBoundary } from "./components/error-boundary";
import { ErrorState } from "./pages/error";
import { AppRoutes } from "./routes/routes";

export function App() {
    return (
        <ErrorBoundary fallback={<ErrorState message="The shell application crashed while rendering." />}>
            <AppRoutes />
        </ErrorBoundary>
    );
}
