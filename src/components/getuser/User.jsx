// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import toast from "react-hot-toast";
// import "./user.css";
// import { Link } from 'react-router-dom';

// const User = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [selectAll, setSelectAll] = useState(false); // State for "Select All" checkbox
//   const [searchQuery, setSearchQuery] = useState(""); // State for search query

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/getall");
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (selectAll) {
//       setSelectedUsers(users.map(user => user._id));
//     } else {
//       setSelectedUsers([]);
//     }
//   }, [selectAll, users]);

//   const deleteUser = async (userId) => {
//     try {
//       const response = await axios.delete(`http://localhost:8000/api/delete/${userId}`);
//       setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
//       toast.success(response.data.msg, { position: 'top-right' });
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   const handleCheckboxChange = (userId) => {
//     setSelectedUsers((prevSelected) =>
//       prevSelected.includes(userId)
//         ? prevSelected.filter((id) => id !== userId)
//         : [...prevSelected, userId]
//     );
//   };

//   const handleSelectAllChange = () => {
//     setSelectAll(prev => !prev);
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Filter users based on search query
//   const filteredUsers = users.filter(user => 
//     user.fname?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className='userTable'>
//       <div className='container'>
//         <div><button className='alltask'>All Tasks</button></div>
//         <div><Link to={"/add"} className='addButton'>New Task</Link></div>
//       </div>
//       <div className='searchContainer'>
//         <input
//           type="text"
//           placeholder="Search by Assigned To"
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//       </div>
//       <table border={1} cellPadding={10} cellSpacing={0}>
//         <thead>
//           <tr>
//             <th>
//               <input
//                 type="checkbox"
//                 checked={selectAll}
//                 onChange={handleSelectAllChange}
//               />
//             </th>
//             <th>Assigned To</th>
//             <th>Status</th>
//             <th>Due Date</th>
//             <th>Priority</th>
//             <th>Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {
//             filteredUsers.map((user) => (
//               <tr key={user._id}>
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={selectedUsers.includes(user._id)}
//                     onChange={() => handleCheckboxChange(user._id)}
//                   />
//                 </td>
//                 <td>{user.fname}</td>
//                 <td>{user.lname}</td>
//                 <td>{user.date}</td>
//                 <td>{user.priority}</td>
//                 <td>{user.description}</td>
//                 <td className='actionButtons'>
//                   <button onClick={() => deleteUser(user._id)}>
//                     <i className="fa-solid fa-trash"></i>
//                   </button>
//                   <Link to={`/edit/${user._id}`}>
//                     <i className="fa-solid fa-pen-to-square"></i>
//                   </Link>
//                 </td>
//               </tr>
//             ))
//           }
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default User;


import React, { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import "./user.css";
import { Link } from 'react-router-dom';

const User = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false); // State for "Select All" checkbox
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage, setItemsPerPage] = useState(10); // State for items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getall");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectAll) {
      setSelectedUsers(users.map(user => user._id));
    } else {
      setSelectedUsers([]);
    }
  }, [selectAll, users]);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete/${userId}`);
      setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
      toast.success(response.data.msg, { position: 'top-right' });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleSelectAllChange = () => {
    setSelectAll(prev => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.fname?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the current page's users
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Pagination controls
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='userTable'>
      <div className='container'>
        <div><button className='alltask'>All Tasks</button></div>
        <div><Link to={"/add"} className='addButton'>New Task</Link></div>
      </div>
      <div className='searchContainer'>
        <input
          type="text"
          placeholder="Search by Assigned To"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
              />
            </th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            currentUsers.map((user) => (
              <tr key={user._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => handleCheckboxChange(user._id)}
                  />
                </td>
                <td>{user.fname}</td>
                <td>{user.lname}</td>
                <td>{user.date}</td>
                <td>{user.priority}</td>
                <td>{user.description}</td>
                <td className='actionButtons'>
                  <button onClick={() => deleteUser(user._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <Link to={`/edit/${user._id}`}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default User;

