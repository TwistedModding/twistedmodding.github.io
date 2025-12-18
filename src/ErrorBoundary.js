import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error details:', errorInfo);
    console.error('Component stack:', errorInfo.componentStack);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          minHeight: '100vh',
          fontFamily: 'monospace'
        }}>
          <h1 style={{ color: '#ff6b6b' }}>Something went wrong</h1>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>
            <summary style={{ cursor: 'pointer', fontSize: '18px', marginBottom: '10px' }}>
              Click to see error details
            </summary>
            <div style={{ 
              backgroundColor: '#000', 
              padding: '20px', 
              borderRadius: '8px',
              marginTop: '10px',
              overflow: 'auto'
            }}>
              <p style={{ color: '#ff6b6b', fontWeight: 'bold' }}>Error:</p>
              <pre>{this.state.error && this.state.error.toString()}</pre>
              
              <p style={{ color: '#ff6b6b', fontWeight: 'bold', marginTop: '20px' }}>Stack:</p>
              <pre>{this.state.error && this.state.error.stack}</pre>
              
              <p style={{ color: '#ff6b6b', fontWeight: 'bold', marginTop: '20px' }}>Component Stack:</p>
              <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
            </div>
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#5865F2',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
