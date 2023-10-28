import { useEffect, useState } from 'react';
import './App.css';
import { TodoContextProvider } from './context/TodoContext';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((allOldTodos) => [{ id: Date.now(), ...todo }, ...allOldTodos])
  };
  const updateTodo = (id, newTodo) => {
    setTodos((allOldTodos) => allOldTodos.map((oldTodo) => (oldTodo.id === id ? newTodo : oldTodo)));
  };
  const deleteTodo = (id) => {
    setTodos((allOldTodos) => allOldTodos.filter((oldTodo) => oldTodo.id !== id));
  };
  // const toggleComplete = (id) => {
  //   setTodos((allOldTodos) => allOldTodos.map((oldTodo) => {
  //     if (oldTodo.id == id) {
  //       return oldTodo.completed = !oldTodo.completed;
  //     } else {
  //       return oldTodo;
  //     }
  //   }))
  // }


  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <TodoContextProvider value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {
              todos.map((todo) => (
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </TodoContextProvider>
  )
}

export default App
