import { openDB } from 'idb';

const DB_NAME = 'tasksDB';
const TASKS_STORE = 'tasks';
const TASKS_DELETE_STORE = 'tasksToDelete';

export const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(TASKS_STORE)) {
        db.createObjectStore(TASKS_STORE, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(TASKS_DELETE_STORE)) {
        db.createObjectStore(TASKS_DELETE_STORE, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  return db;
};

export const addTaskToDB = async (task: any) => {
  const db = await initDB();
  await db.add(TASKS_STORE, task);
};

export const getTasksFromDB = async () => {
  const db = await initDB();
  return await db.getAll(TASKS_STORE);
};

export const clearTasksInDB = async () => {
  const db = await initDB();
  await db.clear(TASKS_STORE);
};

export const deleteTaskById = async (id: number) => {
  const db = await initDB();
  await db.delete(TASKS_STORE, id);
};

export const addTaskToDeleteDB = async (id: number) => {
  const db = await initDB();
  await db.add(TASKS_DELETE_STORE, { id });
};

export const getTasksToDeleteFromDB = async () => {
  const db = await initDB();
  const tasksToDelete = await db.getAll(TASKS_DELETE_STORE);
  return tasksToDelete.map((task) => task.id);
};

export const clearTasksToDeleteInDB = async () => {
  const db = await initDB();
  await db.clear(TASKS_DELETE_STORE);
};
