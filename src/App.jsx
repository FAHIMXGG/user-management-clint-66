
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then (data => setUsers(data))
  },[])

  const handleAddUser = e =>{
    e.preventDefault();
    const form =e.target;
    const name =form.name.value;
    const email = form.email.value;
    const user = {name, email}
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log('inside post res', data)
      const newUsers = [...users, data]
      setUsers(newUsers);
      form.reset();
    })
  }

  return (
    <>
      
      <h1>User Management</h1>
      <h3>Numbers of Users: {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" /> <br />
        <input type="email" name="email" id="" />
      <br />
      <input type="submit" value="Add User"/>
      </form>
      <div>
        {
          users.map(users => <p key={users.id}>{users.id} {users.name} {users.email}</p>)
        }
      </div>
    </>
  )
}

export default App
