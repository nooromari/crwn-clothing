import { Component } from "react";
import {
  ErrorImageContainer,
  ErrorImageOverlay,
  ErrorImageText,
} from "./error-boundary.styles";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    return this.state.hasError ? (
      <ErrorImageOverlay>
        <ErrorImageContainer imageUrl="https://i.imgur.com/QIxIKBH.png" />
        <ErrorImageText>Sorry, Something went wrong</ErrorImageText>
      </ErrorImageOverlay>
    ) : (
      this.props.children
    );
  }
}
export default ErrorBoundary;
