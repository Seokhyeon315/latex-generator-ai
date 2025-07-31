'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({ error, errorInfo });

        // Log to external error reporting service in production
        if (process.env.NODE_ENV === 'production') {
            // Replace with your error reporting service
            // Sentry.captureException(error, { extra: errorInfo });
        }
    }

    handleReset = () => {
        this.setState({ hasError: false });
    };

    override render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-md w-full">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Something went wrong
                            </h2>

                            <p className="text-gray-600 mb-6">
                                We encountered an unexpected error. This has been logged and we will look into it.
                            </p>

                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <details className="mb-6 text-left bg-gray-100 p-4 rounded-lg">
                                    <summary className="font-semibold cursor-pointer mb-2">
                                        Error Details (Development Only)
                                    </summary>
                                    <pre className="text-sm text-red-600 whitespace-pre-wrap overflow-auto">
                                        {this.state.error.toString()}
                                        {this.state.errorInfo?.componentStack}
                                    </pre>
                                </details>
                            )}

                            <div className="space-y-3">
                                <Button
                                    onClick={this.handleReset}
                                    className="w-full flex items-center justify-center gap-2"
                                >
                                    <RefreshCw className="h-4 w-4" />
                                    Try Again
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => window.location.href = '/'}
                                    className="w-full"
                                >
                                    Go to Homepage
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Hook for functional components to handle errors
export const useErrorHandler = () => {
    const handleError = React.useCallback((error: Error, errorInfo?: ErrorInfo) => {
        console.error('Error caught by useErrorHandler:', error, errorInfo);

        // In a real app, you might want to report this to an error tracking service
        // and possibly trigger a state update to show an error UI
    }, []);

    return handleError;
};

// HOC to wrap components with ErrorBoundary
export const withErrorBoundary = <P extends object>(
    Component: React.ComponentType<P>,
    errorFallback?: ReactNode
) => {
    const WrappedComponent = (props: P) => (
        <ErrorBoundary fallback={errorFallback}>
            <Component {...props} />
        </ErrorBoundary>
    );

    WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
    return WrappedComponent;
}; 