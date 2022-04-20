import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import User from './Components/User';

function App() {
  const [users, setUsers]=useState([])
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[])
  const handleSubmit =event =>{
    event.preventDefault()
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user ={name,email}
    
    // post data to server

    fetch('http://localhost:5000/user',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
      const newUsers=[...users,data];
      setUsers(newUsers)
      console.log(data)
    })
  }
  return (
    <div className="App">
      <p>{users.length}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" placeholder='your name'/>
        <input type="email" name="email" id="" placeholder='your email'/>
        <input type="submit" value="submit" />
      </form>
      {
        users.map(user=><User user={user}
        key={user.id}></User>)
      }
    </div>
  );
}

export default App;
