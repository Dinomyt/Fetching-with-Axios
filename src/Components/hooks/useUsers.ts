import { useState, useEffect } from "react";
import userService, { User } from "../Services/userService"

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const FetchData = () => {
        setIsLoading(true);
        const {request} = userService.getAll<User>()
        request
          .then((response) => {
            setUsers(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            setError(error.message);
            setIsLoading(false);
          });
      };

    useEffect(() => {
        FetchData();
    }, []);

    return {users,setUsers,error,setError,isLoading,setIsLoading}
}

export default useUsers;