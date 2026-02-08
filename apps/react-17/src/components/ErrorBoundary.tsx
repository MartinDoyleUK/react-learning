/**
 * ⚡ FEATURE: Error Boundaries (class component)
 *
 * Error boundaries catch JavaScript errors in their child component
 * tree during rendering, lifecycle methods, and constructors.
 *
 * IMPORTANT: Error boundaries MUST be class components — there is
 * no hook equivalent for getDerivedStateFromError / componentDidCatch
 * (even in React 19, this hasn't changed).
 *
 * They do NOT catch errors in:
 *  • Event handlers (use try/catch)
 *  • Async code (promises)
 *  • Server-side rendering
 *  • Errors in the boundary itself
 */
import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Called during rendering — derive new state from the error
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  // Called after rendering — use for logging / error reporting
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo.componentStack);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>⚠️ Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button className="btn btn-primary" onClick={this.handleReset}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

