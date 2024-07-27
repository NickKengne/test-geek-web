import { useEffect, useState } from 'react';

export function useOnlineStatus() : any {

  if (typeof window != undefined) {
    const navigatorObject = window.navigator
    const [isOnline, setIsOnline] = useState<boolean>(navigatorObject.onLine);
    useEffect(() => {
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
  
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
  
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }, []);
    return isOnline
  }
 

  return;
}
