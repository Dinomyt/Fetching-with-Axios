import { useEffect, useState } from "react";
import apiClient from "../Services/apiClient";
import userService, {User} from "../Services/userService";
import useUsers from "../hooks/useUsers";



const CreateDataService = () => {

    const {users,setUsers,error,setError,isLoading,setIsLoading} = useUsers();


    const addUser = () => {
        // original users []
        const originalUsers = [...users]
        // were are going to have a new object with id and name
        const newUser = {id: 0, name: 'Gojo'};
        // set our users and spread all users and add our new user
        setUsers([newUser,...users])
        userService.create(newUser)
        .then(response => setUsers([response.data,...users]))
        .catch(error => {
          setError(error.message);
          setUsers(originalUsers)
        })
      }


      return (
        <>
          <h1 className="text-center">CRUD Add with Axios</h1>
          <button className="btn btn-outline-primary mx-3 mb-3" onClick={addUser}>Add</button>
          <ul className="list-group">
            {users.map((user) => (
              <li
                className="list-group-item d-flex justify-content-between"
                key={user.id}
              >
                {user.name}
                <button
                  className="btn btn-outline-danger"
                >
                </button>{" "}
              </li>
            ))}
            {error && <p className="text-danger">{error}</p>}
            {isLoading && <div className="spinner-border"></div>}
          </ul>
        </>
      );
    };
    export default CreateDataService;