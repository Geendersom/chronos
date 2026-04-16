import styles from './TopBar.module.css'

interface TopBarProps {
  theme: 'dark' | 'light'
  onThemeChange: (theme: 'dark' | 'light') => void
}

export const TopBar = ({ theme, onThemeChange }: TopBarProps) => {
  return (
    <header className={styles.topbar}>
      <div className={styles.brand}>
        <span className={styles.logo} aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="8" />
            <path d="M12 7v5l2.5 1.5" strokeLinecap="round" />
          </svg>
        </span>
        <div>
          <h1>Chronos</h1>
          <p>timer studio</p>
        </div>
      </div>

      <div className={styles.switch}>
        <button
          type="button"
          className={theme === 'dark' ? styles.active : ''}
          onClick={() => onThemeChange('dark')}
        >
          Escuro
        </button>
        <button
          type="button"
          className={theme === 'light' ? styles.active : ''}
          onClick={() => onThemeChange('light')}
        >
          Claro
        </button>
      </div>
    </header>
  )
}
