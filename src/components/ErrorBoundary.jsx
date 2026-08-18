import React from "react";
import ErrorPage from "../pages/ErrorPage.jsx";

// Wraps the app so a crash in any page shows a friendly ErrorPage
// instead of a blank white screen. Usage: <ErrorBoundary><App /></ErrorBoundary>
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message };
  }

  componentDidCatch(error, info) {
    console.error("TyreSaathi crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          message={this.state.message}
          onRetry={() => this.setState({ hasError: false, message: "" })}
        />
      );
    }
    return this.props.children;
  }
}
