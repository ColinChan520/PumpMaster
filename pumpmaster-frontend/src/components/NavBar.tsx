export default function Navbar({ showMenu = false }: { showMenu?: boolean }) {
  return (
    <div
      style={{
        width: '100%',
        padding: '20px',
        fontWeight: 'bold',
        fontSize: '20px',
        color: '#000',
        borderBottom: '1px solid #ccc',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <div style={{ fontWeight: 'bold', fontSize: '20px' }}>+ PumpMaster</div>

      {showMenu && (
        <>
          {/* 中间菜单 */}
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ fontWeight: 'bold', fontSize: '16px', color: '#000', textDecoration: 'none' }}>Dashboard</a>
            <a href="#" style={{ fontWeight: 'bold', fontSize: '16px', color: '#000', textDecoration: 'none' }}>Pumps</a>
            <a href="#" style={{ fontWeight: 'bold', fontSize: '16px', color: '#000', textDecoration: 'none' }}>Reports</a>
            <a href="#" style={{ fontWeight: 'bold', fontSize: '16px', color: '#000', textDecoration: 'none' }}>Alerts</a>
          </div>

          {/* 右侧 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
              padding: '4px 8px',
              borderRadius: '4px',
            }}>
              <span style={{ fontSize: '14px', color: '#888', marginRight: '8px' }}>🔍</span>
              <input
                type="text"
                placeholder="Search"
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  fontSize: '14px',
                }}
              />
            </div>

            <span style={{ fontSize: '20px', color: '#000' }}>🔔</span>

            <img
              src="/static/images/avatar/1.jpg"
              alt="Avatar"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
