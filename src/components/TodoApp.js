import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (task.trim() === '') return;

    await addDoc(collection(db, 'todos'), {
      text: task,
      createdAt: new Date()
    });

    setTask('');
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
      const todoList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(todoList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-purple-200">
      
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">🔥 Firebase Todo App</h2>
          
          <form onSubmit={addTodo} className="flex flex-col sm:flex-row items-center gap-2 mb-6">
            <input 
              type="text" 
              value={task} 
              onChange={(e) => setTask(e.target.value)} 
              placeholder="Enter a task" 
              className="flex-1 px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
            />
            <button 
              type="submit" 
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200 w-full sm:w-auto"
            >
              Add
            </button>
          </form>

          <ul className="space-y-3">
            {todos.map(todo => (
              <li 
                key={todo.id} 
                className="bg-purple-100 text-purple-800 px-4 py-2 rounded-md shadow-sm flex justify-between items-center hover:bg-purple-200 transition"
              >
                <span className="truncate">{todo.text}</span>
                <button 
                  onClick={() => deleteTodo(todo.id)} 
                  className="text-red-600 hover:text-red-800 text-sm font-medium ml-4"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-4 px-6 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto">
          <p className="text-sm text-center md:text-left mb-3 md:mb-0">
            &copy; 2025 <span className="font-semibold text-purple-300">Bangis Tec</span>, All Rights Reserved
          </p>
          <div className="flex gap-6 text-lg">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-400 transition"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-square"></i>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-300 transition"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter-square"></i>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-pink-400 transition"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram-square"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TodoApp;
