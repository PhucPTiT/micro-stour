import { ErrorBoundary } from "./components/error-boundary";
import { ErrorState } from "./pages/error";
import { AppRoutes } from "./routes/routes";
export default function App() {
    return (
        <ErrorBoundary fallback={<ErrorState message="The module crashed while rendering." />}>
            <AppRoutes />
        </ErrorBoundary>
    );
}
