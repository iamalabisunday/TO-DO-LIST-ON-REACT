import {useEffect, useState} from "react";

export default function ToDoLists() {
  const [toDo, setToDO] = useState("");
  const [enteredTodos, setEnteredTodos] = useState([]);

  useEffect(() => {
    localStorage.setItem("ReactToDos", JSON.stringify(enteredTodos));
  }, [enteredTodos]);

  const submissionManager = (e) => {
    e.preventDefault();
    setEnteredTodos([...enteredTodos, toDo]);
    setToDO("");
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
              value={toDo || " "}
              onChange={(e) => setToDO(e.target.value)}
            />
            <button
              className="bg-[#FF5846] text-white text-sm p-2 rounded-sm cursor-pointer"
              type="submit"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
