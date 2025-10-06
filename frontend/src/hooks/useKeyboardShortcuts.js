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
        const destination = prompt('Quick navigate to:\n\n1. Home\n2. About\n3. Create Gift\n4. Gallery\n5. Leaderboard\n6. My Impact\n7. Transparency\n8. Bulk Orders\n\nEnter number:');
        
        const routes = {
          '1': '/',
          '2': '/about',
          '3': '/compose',
          '4': '/gallery',
          '5': '/leaderboard',
          '6': '/impact',
          '7': '/transparency',
          '8': '/bulk'
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
          case 'a':
            navigate('/about');
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
          case 'i':
            navigate('/impact');
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
A - About
C - Create Gift  
G - Gallery
L - Leaderboard
I - My Impact
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
