import { useEffect, useState } from 'react';
import { getTasksFromDB, clearTasksInDB, getTasksToDeleteFromDB, clearTasksToDeleteInDB } from '@/db/localDb';
import axios from 'axios';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const navigatorObject = window.navigator;
      setIsOnline(navigatorObject.onLine);

      const handleOnline = async () => {
        setIsOnline(true);
        await syncTasksWithServer(); // Synchronize tasks when online
        await syncTaskDeletionsWithServer(); // Synchronize deletions when online
      };
      const handleOffline = () => setIsOnline(false);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  const syncTasksWithServer = async () => {
    try {
      const localTasks = await getTasksFromDB();
      if (localTasks.length > 0) {
        await Promise.all(localTasks.map(task => axios.post("http://localhost:8087/api/v1/task/", task)));
        await clearTasksInDB(); // Clear local DB lafter successful sync
      }
    } catch (error) {
      console.error('Failed to sync tasks with server:', error);
    }
  };

  const syncTaskDeletionsWithServer = async () => {
    try {
      const tasksToDelete = await getTasksToDeleteFromDB();
      if (tasksToDelete.length > 0) {
        await Promise.all(tasksToDelete.map(id => axios.delete(`http://localhost:8087/api/v1/task/${id}`)));
        await clearTasksToDeleteInDB(); // Clear local DB after successful sync
      }
    } catch (error) {
      console.error('Failed to sync task deletions with server:', error);
    }
  };

  return isOnline;
}
