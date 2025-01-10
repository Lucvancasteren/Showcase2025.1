export default function Footer() {
  return (
    <footer style={styles.footer}>
      {/* ... footer content ... */}
    </footer>
  );
}

const styles = {
  footer: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderTop: '1px solid #eaeaea',
    textAlign: 'center' as const,
    position: 'fixed' as const,
    bottom: 0,
  }
}; 