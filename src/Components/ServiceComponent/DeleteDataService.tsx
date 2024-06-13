import apiClient from "../Services/apiClient";
import { useEffect, useState } from "react";
import userService, { User } from "../Services/userService";
import useUsers from "../hooks/useUsers";

const DeleteDataService = () => {
    const {users,setUsers,error,setError,isLoading,setIsLoading} = useUsers();
    
    //create a helper function to help us delete our users
    const userDelete = (user: User) => {
        const orginalUsers = [...users];
        setUsers(users.filter(u => u.id !== user.id));
        userService.delete(user.id)
        .catch(error => {
            setError(error.message);
            setUsers(orginalUsers);
            setIsLoading(false);
        })
    }

  return (
    <>
    <h1 className="text-center">CRUD Delete with apiClient</h1>
    <ul className="list-group">
        {users.map(user => <li className="list-group-item d-flex justify-content-between" key={user.id}>{user.name} <button onClick={() => userDelete(user)} className="btn btn-outline-danger">Delete</button></li>)}
        
        {error && <p className="text-danger">{error}</p>}
        { isLoading && <div className="spinner-border"></div>}
    </ul>
    </>
  )
}

export default DeleteDataService