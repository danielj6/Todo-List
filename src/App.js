import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import {Button, FormControl, InputLabel, Input} from '@material-ui/core';
import './App.css';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState(['abc', 'def']);
  const [input, setInput] = useState('');

  // when the app loads, we need to the database and fetch new todos as they get added/removed
  useEffect(() => {
    // this code here... fires when the app.js loads. this code is doing all the listening
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
    }, []);
  
  // this will fire off when we click the button
  const addTodo = (event) => {
    event.preventDefault(); // will prevent refresh
    
    db.collection('todos').add({
      todo: input,
      timestamp:  firebase.firestore.FieldValue.serverTimestamp()
    });

    setTodos([...todos, input]);
    setInput('');
   }

  return (
    <div className="App">
      <h1>To Do List</h1>
      <form>
        <FormControl>
          <InputLabel>✍️Write a Todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>
        
        <Button disabled={!input} type="submit" onClick={addTodo}variant="contained" color="primary">Add ToDo</Button>

        <ul>
          {todos.map(todo => (
          <Todo todo={todo} />
          ))}
        </ul>
      </form>
      
    </div>
  );
}

export default App;
 