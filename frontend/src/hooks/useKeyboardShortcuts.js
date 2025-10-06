import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useKeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only trigger if not typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Cmd/Ctrl + K for quick navigation
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const destination = prompt('Quick navigate to:\n\n1. Home\n2. Create Gift\n3. Gallery\n4. Leaderboard\n5. My Impact\n6. Transparency\n7. Bulk Orders\n8. Refer & Earn\n\nEnter number:');
        
        const routes = {
          '1': '/',
          '2': '/compose',
          '3': '/gallery',
          '4': '/leaderboard',
          '5': '/impact',
          '6': '/transparency',
          '7': '/bulk',
          '8': '/referral'
        };
        
        if (routes[destination]) {
          navigate(routes[destination]);
        }
        return;
      }

      // Individual shortcuts (only when not holding Cmd/Ctrl)
      if (!e.metaKey && !e.ctrlKey && !e.altKey) {
        switch(e.key.toLowerCase()) {
          case 'h':
            navigate('/');
            break;
          case 'c':
            navigate('/compose');
            break;
          case 'g':
            navigate('/gallery');
            break;
          case 'l':
            navigate('/leaderboard');
            break;
          case 'r':
            navigate('/referral');
            break;
          case 't':
            navigate('/transparency');
            break;
          case 'b':
            navigate('/bulk');
            break;
          case '?':
            showShortcutsHelp();
            break;
          default:
            break;
        }
      }
    };

    const showShortcutsHelp = () => {
      alert(`⌨️ Keyboard Shortcuts:

H - Home
C - Create Gift  
G - Gallery
L - Leaderboard
R - Refer & Earn
T - Transparency
B - Bulk Orders
? - Show this help

⌘/Ctrl + K - Quick navigate

💡 Shortcuts work when not typing in a field!`);
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate]);
}
