import { Trash2 } from "lucide-react";
import React from "react";

export interface Task {
  id?: number;
  task: string;
}

export default function TaskLists({
  tasks,
  onDelete,
}: {
  tasks: Task[];
  onDelete: (id: any) => void;
}) {
  return (
    <div className="lg:w-[60%] w-[100%] flex flex-col gap-3">
      {tasks.map((task, index) => (
        <div key={index} className="p-2 bg-blue-100 relative">
          <p className="text-black">📅 {task.task}</p>
          <Trash2
            className="absolute top-3 right-1"
            color="red"
            onClick={() => onDelete(task.id)}
            size={15}
          />
        </div>
      ))}
    </div>
  );
}
