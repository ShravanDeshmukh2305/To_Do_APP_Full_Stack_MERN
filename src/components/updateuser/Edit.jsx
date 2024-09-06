import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../adduser/add.css";
import toast from 'react-hot-toast';

const Edit = () => {
  const initialUser = {
    fname: "",
    lname: "",
    date: "",
    email: "",
    priority: "",
    description: ""
  };

  const [user, setUser] = useState(initialUser);
  const [userOptions, setUserOptions] = useState([]); // State for dropdown options
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getone/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchUserOptions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getall");
        console.log("Fetched user options:", response.data); // Log fetched data
        setUserOptions(response.data);
      } catch (error) {
        console.error("Error fetching user options:", error);
      }
    };

    fetchUser();
    fetchUserOptions();
  }, [id]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/update/${id}`, user);
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>
      <h3>Update user</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">Assigned To</label>
          <select
            value={user.fname} // Bind the selected value
            onChange={inputChangeHandler}
            id="fname"
            name="fname"
            autoComplete="off"
          >
            <option value="" disabled>Select User</option>
            {userOptions.map((option) => (
              <option key={option._id} value={option._id}>
                {option.fname} {/* Adjust this based on your API response */}
              </option>
            ))}
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Status</label>
          <input type="text" value={user.lname} onChange={inputChangeHandler} id="lname" name="lname" autoComplete='off' placeholder='Status' />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input type="email" value={user.email} onChange={inputChangeHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
        </div>
        <div className="inputGroup">
          <label htmlFor="date">Due Date</label>
          <input
            type="date"
            value={user.date}
            onChange={inputChangeHandler}
            id="date"
            name="date"
            autoComplete="off"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="priority">Priority</label>
          <select
            value={user.priority} // Bind the selected value
            onChange={inputChangeHandler}
            id="priority"
            name="priority"
            autoComplete="off"
          >
            <option value="" disabled>Select priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={user.description} // Bind the value to the state
            onChange={inputChangeHandler}
            id="description"
            name="description"
            autoComplete="off"
            placeholder="Enter description"
          />
        </div>
        <div className="inputGroup">
          <button type="submit">UPDATE USER</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
