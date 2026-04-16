import React from "react";

type ErrorBoundaryProps = {
    children: React.ReactNode;
    fallback: React.ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public override state: ErrorBoundaryState = {
        hasError: false,
    };

    public static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Shell render error:", error, errorInfo);
    }

    public override render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}
