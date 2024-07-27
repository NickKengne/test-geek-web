import { Task } from '@/components/TaskLists';
import { openDB } from 'idb';

const DB_NAME = 'tasksdb';
const STORE_NAME = 'tasks';

export async function initDB() {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  return db;
}

export async function addTaskToDB(task: Task) {
  const db = await initDB();
  await db.add(STORE_NAME, task);
}

export async function getTasksFromDB() {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
}

export async function clearTasksInDB() {
  const db = await initDB();
  await db.clear(STORE_NAME);
}


export async function deleteTaskById(id: number) {
    const db = await initDB();
    await db.delete(STORE_NAME,id) 
}
