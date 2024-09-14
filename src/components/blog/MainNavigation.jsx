import React from 'react';
import { Calendar, Sparkles, Bookmark, Clock, Grid, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// 保留原有的样式对象
const styles = {
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '0 15px',
  },
  nav: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'flex-start',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '20px',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 300ms ease-in-out',
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  activeButton: {
    backgroundColor: '#2563eb',
    color: 'white',
  },
  inactiveButton: {
    backgroundColor: 'white',
    color: '#374151',
    border: '1px solid #e5e7eb',
  },
  icon: {
    width: '16px',
    height: '16px',
    marginRight: '8px',
  },
};

const MainNavigation = () => {
    const router = useRouter();
    const currentPath = router.pathname;
  
    const tabs = [
      { name: 'Today', path: '/', icon: Calendar },
      { name: 'New', path: '/new', icon: Sparkles },
      { name: 'Most Saved', path: '/most-saved', icon: Bookmark },
      { name: 'Most Used', path: '/most-used', icon: Clock },
      { name: 'Apps', path: '/apps', icon: Grid },
      { name: 'Discord of AI', path: '/discord-of-ai', icon: MessageCircle },
    ];
  
    return (
      <div style={styles.container}>
        <nav style={styles.nav}>
          {tabs.map((tab) => (
            <Link 
              key={tab.path} 
              href={tab.path}
              style={{
                ...styles.button,
                ...(currentPath === tab.path ? styles.activeButton : styles.inactiveButton),
              }}
            >
              <tab.icon style={styles.icon} />
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>
    );
  };
  
  export default MainNavigation;