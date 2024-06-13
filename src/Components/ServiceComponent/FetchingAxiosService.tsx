import { useEffect, useState } from "react";
import userService, { User } from "../Services/userService";
import useUsers from "../hooks/useUsers";

const FetchingWFetchService = () => {

  const {users,setUsers,error,setError,isLoading,setIsLoading} = useUsers();


return (


  <>
      <h1 className="text-center">Fetching Data using fetch</h1>
      <div>
          <ul>
              {users.map(user => <li key={user.id}>{user.name}</li>)}
          </ul>
      </div>
  </>
)
}

export default FetchingWFetchService