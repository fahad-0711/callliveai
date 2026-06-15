import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{
        flex: 1,
        marginLeft: 'var(--sidebar-width)',
        transition: 'margin-left 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        <Topbar />
        <main style={{
          flex: 1,
          padding: '24px 28px',
          overflowY: 'auto',
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
