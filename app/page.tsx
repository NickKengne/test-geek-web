"use client";
import TaskLists, { Task } from "@/app/components/TaskLists";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  addTaskToDB,
  getTasksFromDB,
  clearTasksInDB,
  deleteTaskById,
} from "@/db/localDb";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import React, { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

export default function Page() {
  const [isOnline, setIsOnline] = useState<any>(null);
  const onlineStatus = useOnlineStatus();
  const [taskToAdd, setTaskToAdd] = useState<Task>({ task: "" });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showStatusMessage, setShowStatusMessage] = useState(false);

  const handleChange = (field: string, value: string) => {
    setTaskToAdd((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    setIsOnline(onlineStatus);
    if(onlineStatus){
      setShowStatusMessage(true);
      const hideStatusMessageTimeout = setTimeout(() => {
        setShowStatusMessage(false);
      }, 3000); // Hide after 3 seconds
      return () => clearTimeout(hideStatusMessageTimeout);
    }
    setShowStatusMessage(true);
  }, [onlineStatus]);

  useEffect(() => {
    if (isOnline) {
      fetchTasksFromServer();
    } else {
      fetchTasksFromDB();
    }
  }, [isOnline]);

  const fetchTasksFromDB = async () => {
    const localTasks = await getTasksFromDB();
    setTasks(localTasks);
  };

  const fetchTasksFromServer = async () => {
    try {
      const response = await axios.get<Task[]>("http://localhost:8087/api/v1/task/all");
      const serverTasks = response.data;
      setTasks(serverTasks);
      await clearTasksInDB();
      for (const task of serverTasks) {
        await addTaskToDB(task);
      }
    } catch (error) {
     toast("Failed to fetch task from the server")
    }
  };

  const addTask = async () => {
    if (taskToAdd.task === "") {
      toast("La tâche ne devrait pas être vide !");
    } else {
      if (isOnline) {
        try {
          const response = await axios.post("http://localhost:8087/api/v1/task/", taskToAdd);
          toast(response.data.message)
          setTasks((prevTasks) => [...prevTasks, taskToAdd]);
          //await addTaskToDB(taskToAdd);
        } catch (error) {
          toast("Failed to add task to server");
        }
      } else {
        await addTaskToDB(taskToAdd);
        fetchTasksFromDB();
      }
      setTaskToAdd({ task: "" });
    }
  };

  const deleteTask = async (id: number) => {
   
      if (isOnline) {
       const deleteResponse = await axios.delete(`http://localhost:8087/api/v1/task/${id}`);
       toast(deleteResponse.data.message)
      }
      await deleteTaskById(id);
      setTasks(tasks.filter((task) => task.id !== id));
    
  };



  return (
    <div className="w-full min-h-screen flex flex-col items-center p-7">
      <ThemeToggle className="absolute right-5 top-5" />
      <div className="w-[50%] bg-foreground top-4 mx-auto rounded-sm">
        <p className="text-center text-xl text-background">Todolist</p>
      </div>
      <div className="w-[60%] flex justify-center items-center p-4">
        <TaskLists tasks={tasks} onDelete={deleteTask} />
      </div>
      <div className="w-[40%] h-[40px] flex flex-row gap-2 justify-between items-center fixed bottom-8">
        <Input
          placeholder="Ajouter une nouvelle tâche"
          value={taskToAdd.task}
          onChange={(value) => handleChange("task", value.target.value)}
        />
        <Button onClick={addTask}>Ajouter</Button>
      </div>
      <Suspense fallback={<p>Loading</p>}>
        {isOnline !== null && showStatusMessage && (
          <div
            className={`w-[50%] mx-auto fixed bottom-1 ${
              isOnline ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {isOnline ? (
              <p className="text-center text-white text-sm">
                Vous êtes connectés
              </p>
            ) : (
              <p className="text-center text-white text-sm">
                Aucune connexion internet
              </p>
            )}
          </div>
        )}
      </Suspense>
    </div>
  );
}
