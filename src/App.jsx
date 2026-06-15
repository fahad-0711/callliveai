import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import SpaceBackground from './SpaceBackground';
import { ToastProvider } from './hooks/useToast';
import ToastContainer from './components/ui/Toast';

// Lazy load all pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Leads = lazy(() => import('./pages/Leads'));
const Pipeline = lazy(() => import('./pages/Pipeline'));
const Properties = lazy(() => import('./pages/Properties'));
const Activities = lazy(() => import('./pages/Activities'));
const Contacts = lazy(() => import('./pages/Contacts'));
const Reports = lazy(() => import('./pages/Reports'));
const Settings = lazy(() => import('./pages/Settings'));

// Skeleton fallback
function PageSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '8px 0' }}>
      <div className="skeleton" style={{ width: 280, height: 32 }} />
      <div className="skeleton" style={{ width: 200, height: 16 }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton" style={{ height: 120, borderRadius: 20 }} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
        <div className="skeleton" style={{ height: 300, borderRadius: 20 }} />
        <div className="skeleton" style={{ height: 300, borderRadius: 20 }} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <HashRouter>
        {/* Space Background — persistent behind everything */}
        <SpaceBackground />
        
        <Layout>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/pipeline" element={<Pipeline />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </Layout>

        <ToastContainer />
      </HashRouter>
    </ToastProvider>
  );
}
