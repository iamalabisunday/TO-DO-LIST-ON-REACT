import {useEffect, useState} from "react";
import TodoComponent from "./assets/TodoComponent.jsx";

export default function ToDoLists() {
  const [toDo, setToDO] = useState("");
  const [enteredTodos, setEnteredTodos] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Get and load data from local storage
  useEffect(() => {
    const storedTodos = localStorage.getItem("ReactTodos");
    if (storedTodos) {
      setEnteredTodos(JSON.parse(storedTodos));
    }
    setInitialLoad(false);
  }, []);

  // Saved to local storage.
  useEffect(() => {
    if (!initialLoad) {
      localStorage.setItem("ReactTodos", JSON.stringify(enteredTodos));
    }
  });

  const submissionManager = (e) => {
    e.preventDefault();
    if (isEditing && editIndex !== null) {
      // Update existing todo
      const updatedTodos = [...enteredTodos];
      updatedTodos[editIndex] = toDo;
      setEnteredTodos(updatedTodos);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add new todo
      setEnteredTodos([...enteredTodos, toDo]);
    }
    setToDO("");
  };

  // Edit Todo Function
  const editTodo = (index) => {
    setToDO(enteredTodos[index]);
    setEditIndex(index);
    setIsEditing(true);
  };
  return (
    <div className="w-screen h-screen mx-auto bg-gray-300">
      <div className="container mx-auto flex justify-center items-center">
        <div className="bg-gray-50 w-fit h-auto rounded-2xl border-2 border-gray-100 p-4 m-10 flex flex-col gap-2">
          <div className="w-fit h-auto">
            <h1 className="text-gray-600 font-medium">To-Do List 📝</h1>
          </div>
          <form action="todo" className="w-fit flex flex-row gap-2" onSubmit={submissionManager}>
            <input
              type="text"
              className="border-1 rounded-sm px-2 border-[#FF5846] active:border-2 active:border-[#FF5846] placeholder:text-sm placeholder:text-gray-300"
              placeholder="Add your task"
              value={toDo || ""}
              onChange={(e) => setToDO(e.target.value)}
            />
            <button
              className="bg-[#FF5846] text-white text-sm p-2 rounded-sm cursor-pointer"
              type="submit"
            >
              Add Task
            </button>
          </form>
          {/* Render Data */}
          {enteredTodos.map((todoItem, index) => (
            <div key={index} className="flex justify-between">
              <TodoComponent todoItem={todoItem} />
              <div className="bg-gray-600 py-1 px-2 rounded-sm text-white cursor-pointer">
                <button onClick={() => editTodo(index)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
