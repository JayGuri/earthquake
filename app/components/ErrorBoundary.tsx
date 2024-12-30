'use client'

import React, { ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2 className="text-2xl font-bold mb-2">Oops, there was an error!</h2>
          <p>We're sorry, something went wrong. Please try refreshing the page or contact support if the problem persists.</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

