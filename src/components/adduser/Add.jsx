import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const Add = () => {

  const users = {
    fname: "",
    lname: "",
    date: "",
    email: "",
    password: "",
    priority: "",
    description:"",
  }

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/create", user);
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error('Failed to add user', { position: "top-right" });
    }
  }

  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>
      <h3>Add new user</h3>
      <form className='addUserForm' onSubmit={submitForm}>
      <div className="inputGroup">
    <label htmlFor="fname">Assigned To</label>
    <select
        onChange={inputHandler}
        id="fname"
        name="fname"
        autoComplete="off"
    >
        <option value="" disabled selected>Select User</option>
        <option value="User 1">User 1</option>
        <option value="User 2">User 2</option>
        <option value="User 3">User 3</option>
        <option value="User 4">User 4</option>
        <option value="User 5">User 5</option>
        <option value="User 6">User 6</option>
        <option value="User 7">User 7</option>
    </select>
</div>
<div className="inputGroup">
    <label htmlFor="lname">Status</label>
    <select
        onChange={inputHandler}
        id="lname"
        name="lname"
        autoComplete="off"
    >
        <option value="" disabled selected>Status</option>
        <option value="Not Started">Not Started</option>
        <option value="In progress">In progress</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
    </select>
</div>
        <div className="inputGroup">
          <label htmlFor="date">Due Date</label>
          <input
            type="date"
            onChange={inputHandler}
            id="date"
            name="date"
            autoComplete="off"
            placeholder="Select due date"
          />
        </div>



        <div className="inputGroup">
    <label htmlFor="priority">Priority</label>
    <select
        onChange={inputHandler}
        id="priority"
        name="priority"
        autoComplete="off"
    >
        <option value="" disabled selected>Select priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
    </select>
</div>

<div className="inputGroup">
  <label htmlFor="description">Description</label>
  <input
    type="text"
    onChange={inputHandler}
    id="description"
    name="description"
    autoComplete="off"
    placeholder="Enter description"
  />
</div>

<div className="inputGroup">
  <label htmlFor="email">Email</label>
  <input
    type="email"
    onChange={inputHandler}
    id="email"
    name="email"
    autoComplete="off"
    placeholder="Email"
  />
</div>

<div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input type="password" onChange={inputHandler} id="password" name="password" autoComplete='off' placeholder='password' />
        </div>


        <div className="inputGroup">
          <button type="submit">ADD USER</button>
        </div>
        



      </form>
    </div>
  )
}

export default Add;
