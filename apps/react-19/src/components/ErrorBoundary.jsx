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
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Called during rendering — derive new state from the error
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Called after rendering — use for logging / error reporting
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
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

