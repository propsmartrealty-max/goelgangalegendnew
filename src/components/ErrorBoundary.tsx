import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw, MessageSquare } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Digital Fortress Intercepted Uncaught Error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#06080D',
          color: '#F8FAFC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '20px',
            padding: '40px 30px',
            maxWidth: '520px',
            textAlign: 'center',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              color: '#F59E0B'
            }}>
              <ShieldAlert size={32} />
            </div>

            <span style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#F59E0B',
              display: 'block',
              marginBottom: '10px'
            }}>
              Digital Fortress Active Protection
            </span>

            <h1 style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '14px',
              lineHeight: 1.3
            }}>
              Goel Ganga Legend County
            </h1>

            <p style={{
              fontSize: '0.92rem',
              color: '#94A3B8',
              lineHeight: 1.6,
              marginBottom: '28px'
            }}>
              The self-healing fortress intercepted an unexpected render cycle. Your session is completely protected. Refresh the view or connect directly with our sales desk.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={this.handleReload}
                style={{
                  background: 'linear-gradient(135deg, #F59E0B, #B45309)',
                  color: '#0F172A',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '12px 24px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <RefreshCw size={16} /> Restore Portal
              </button>

              <a
                href="https://wa.me/917744009295?text=Hi,%20I%20am%20enquiring%20about%20Goel%20Ganga%20Legend%20County%20Bavdhan."
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '9999px',
                  padding: '12px 24px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <MessageSquare size={16} /> WhatsApp Concierge
              </a>
            </div>

            <div style={{ marginTop: '24px', fontSize: '0.72rem', color: '#64748B' }}>
              MahaRERA: P52100054578 · Bavdhan, Pune
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
