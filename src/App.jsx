import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Tabs } from './components/Tabs'
import { ToDoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'

function App() {

  // const todos = [
  //   { input: 'Hi, Add your first to do', complete: true },
  //   { input: 'Get Groceries', complete: false },
  //   { input: 'Learn web design', complete: true },
  //   { input: 'Learn software development life cycles', complete: false },
  // ]

  const [todos, setTodos] = useState([])  
  
  const [selectedTab, setSelectedTab] = useState('Open')
  
  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, {input: newTodo, complete:false}]
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleUpdateTodo(index) {
    let newTodoList = [...todos]
    let completedTodo = todos[index]
    completedTodo['complete'] = true
    newTodoList[index] = completedTodo
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleDeleteTodo(index) {
    let newTodoList = todos.filter((val, valIndex) => {
      return valIndex !== index 
    })

    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }
  
  function handleSaveData(currentTodos) {
    //function to actively save data reactively
    localStorage.setItem('todo-app', JSON.stringify({ todos: currentTodos }))
  }

  useEffect(() => {
    //verifies if the local storagge is accessible and if there is a previous record of it, if not it will return blank
    //if there is it will set the viewable list to what it was before you left the page last time
    if (!localStorage || !localStorage.getItem('todo-app')) {
      return
    }
    let db = JSON.parse(localStorage.getItem('todo-app'))
    setTodos(db.todos)
    
  }, [])
  return (
    <>
      <Header todos={todos} />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} 
      todos={todos} />
      <TodoList handleUpdateTodo={handleUpdateTodo} 
      handleDeleteTodo={handleDeleteTodo} selectedTab={selectedTab} todos={todos} />
      <ToDoInput handleAddTodo={handleAddTodo} />
    </>
  )
}

export default App
