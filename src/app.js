import React, { useState, useEffect, useCallback } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const styles = {
  header: {
    background: '#111111',
    borderBottom: '1px solid #222',
    padding: '1.2rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerTitle: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#f97316',
    letterSpacing: '-0.02em',
  },
  headerSub: {
    fontSize: '0.75rem',
    color: '#525252',
    marginTop: '2px',
  },
  pill: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: '#1a1a1a',
    border: '1px solid #222',
    borderRadius: '20px',
    padding: '5px 12px',
    fontSize: '0.75rem',
    color: '#f97316',
    fontFamily: 'monospace',
  },
  dot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#22c55e',
  },
  main: {
    maxWidth: '860px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  statCard: {
    background: '#111111',
    border: '1px solid #222',
    borderRadius: '12px',
    padding: '1.2rem 1.4rem',
    position: 'relative',
    overflow: 'hidden',
  },
  statAccent: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #f97316, #ea580c)',
  },
  statLabel: {
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#525252',
    marginBottom: '0.3rem',
  },
  statValue: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#e5e5e5',
  },
  card: {
    background: '#111111',
    border: '1px solid #222',
    borderRadius: '12px',
    padding: '1.6rem',
    marginBottom: '1.2rem',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '1.2rem',
  },
  cardIcon: {
    width: '34px',
    height: '34px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    flexShrink: 0,
  },
  cardTitle: {
    fontSize: '0.92rem',
    fontWeight: 600,
    color: '#e5e5e5',
  },
  cardSub: {
    fontSize: '0.73rem',
    color: '#525252',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr auto',
    gap: '0.8rem',
    alignItems: 'flex-end',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  label: {
    fontSize: '0.72rem',
    fontWeight: 500,
    color: '#525252',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  input: {
    padding: '0.65rem 0.9rem',
    background: '#1a1a1a',
    border: '1px solid #222',
    borderRadius: '8px',
    color: '#e5e5e5',
    fontSize: '0.9rem',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  btn: {
    padding: '0.65rem 1.3rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '0.88rem',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    transition: 'opacity 0.2s',
    whiteSpace: 'nowrap',
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    color: '#fff',
  },
  btnGhost: {
    background: '#1a1a1a',
    color: '#525252',
    border: '1px solid #222',
  },
  alert: (type) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: type === 'success' ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
    border: `1px solid ${type === 'success' ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
    borderRadius: '8px',
    padding: '0.65rem 1rem',
    fontSize: '0.85rem',
    color: type === 'success' ? '#22c55e' : '#ef4444',
    marginBottom: '1rem',
  }),
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.86rem',
  },
  th: {
    padding: '0.5rem 0.8rem',
    textAlign: 'left',
    fontSize: '0.7rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#525252',
    borderBottom: '1px solid #222',
  },
  td: {
    padding: '0.75rem 0.8rem',
    borderBottom: '1px solid #1a1a1a',
    color: '#e5e5e5',
  },
  badgeAmplify: {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: '20px',
    fontSize: '0.72rem',
    fontWeight: 600,
    background: 'rgba(249,115,22,0.12)',
    color: '#f97316',
    border: '1px solid rgba(249,115,22,0.25)',
  },
  badgeLambda: {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: '20px',
    fontSize: '0.72rem',
    fontWeight: 600,
    background: 'rgba(124,92,252,0.12)',
    color: '#a78bfa',
    border: '1px solid rgba(124,92,252,0.25)',
  },
  empty: {
    textAlign: 'center',
    color: '#525252',
    padding: '2rem',
  },
  spinner: {
    width: '18px',
    height: '18px',
    border: '2px solid #222',
    borderTop: '2px solid #f97316',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    display: 'inline-block',
  },
};

export default function App() {
  const [records, setRecords]   = useState([]);
  const [name, setName]         = useState('');
  const [value, setValue]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [fetching, setFetching] = useState(true);
  const [alert, setAlert]       = useState(null);

  // Inject spin keyframe
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
  }, []);

  const fetchRecords = useCallback(async () => {
    try {
      const res  = await fetch(API_URL);
      const data = await res.json();
      setRecords(data.records || []);
    } catch {
      setAlert({ type: 'error', msg: 'Failed to fetch records' });
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => { fetchRecords(); }, [fetchRecords]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !value.trim()) return;
    setLoading(true);
    setAlert(null);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), value: value.trim() }),
      });
      if (res.ok) {
        setAlert({ type: 'success', msg: `✅ Record added: ${name} = ${value}` });
        setName('');
        setValue('');
        await fetchRecords();
      } else {
        setAlert({ type: 'error', msg: '❌ Failed to add record' });
      }
    } catch {
      setAlert({ type: 'error', msg: '❌ Network error' });
    } finally {
      setLoading(false);
    }
  };

  const totalLambda  = records.filter(r => r.source === 'lambda').length;
  const totalAmplify = records.filter(r => r.source === 'amplify').length;

  return (
    <>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.headerTitle}>◈ Records App</div>
          <div style={styles.headerSub}>Amplify + API Gateway + RDS</div>
        </div>
        <div style={styles.pill}>
          <span style={styles.dot}/>
          amplify
        </div>
      </div>

      <div style={styles.main}>

        {/* Stats */}
        <div style={styles.statsGrid}>
          {[
            { label: 'Total Records', value: records.length },
            { label: 'From Lambda',   value: totalLambda    },
            { label: 'From Amplify',  value: totalAmplify   },
          ].map((s, i) => (
            <div key={i} style={styles.statCard}>
              <div style={styles.statAccent}/>
              <div style={styles.statLabel}>{s.label}</div>
              <div style={styles.statValue}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardIcon}>➕</div>
            <div>
              <div style={styles.cardTitle}>Add Record</div>
              <div style={styles.cardSub}>Writes to shared RDS MySQL</div>
            </div>
          </div>

          {alert && (
            <div style={styles.alert(alert.type)}>{alert.msg}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="e.g. temperature"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e  => e.target.style.borderColor = '#222'}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Value</label>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="e.g. 72.4"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  onFocus={e => e.target.style.borderColor = '#f97316'}
                  onBlur={e  => e.target.style.borderColor = '#222'}
                  required
                />
              </div>
              <button
                type="submit"
                style={{ ...styles.btn, ...styles.btnPrimary }}
                disabled={loading}
              >
                {loading ? '...' : 'Submit →'}
              </button>
            </div>
          </form>
        </div>

        {/* Table */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardIcon}>📋</div>
            <div>
              <div style={styles.cardTitle}>Records</div>
              <div style={styles.cardSub}>Last 50 entries from both apps</div>
            </div>
            <button
              onClick={fetchRecords}
              style={{ ...styles.btn, ...styles.btnGhost, marginLeft: 'auto' }}
            >
              ↻ Refresh
            </button>
          </div>

          {fetching ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={styles.spinner}/>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {['ID', 'Name', 'Value', 'Source', 'Created At'].map(h => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {records.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={styles.empty}>
                        No records yet. Add one above!
                      </td>
                    </tr>
                  ) : records.map(r => (
                    <tr key={r.id}
                        onMouseEnter={e => e.currentTarget.style.background = '#1a1a1a'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={styles.td}>#{r.id}</td>
                      <td style={styles.td}>{r.name}</td>
                      <td style={styles.td}>{r.value}</td>
                      <td style={styles.td}>
                        <span style={r.source === 'lambda'
                          ? styles.badgeLambda
                          : styles.badgeAmplify}>
                          {r.source}
                        </span>
                      </td>
                      <td style={{ ...styles.td, color: '#525252' }}>
                        {r.created_at}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </>
  );
}