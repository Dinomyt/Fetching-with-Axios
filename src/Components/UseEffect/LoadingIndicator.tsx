import axios from "axios";
import { useEffect, useState } from "react";

interface User {
    id: number
    name: string
    username: string
}


const LoadingIndicator = () => {
  const [category, setCategory] = useState(5);
  const [data, setData] = useState([]);
  const endpoints = ['posts', 'comments', 'albums', 'photos', 'todos', 'users'];
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const FetchData = () =>{
    setIsLoading(true);
    axios.get(`https://jsonplaceholder.typicode.com/${endpoints[category]}`)
      .then(response => {
        setUsers(response.data);
        setIsLoading(false);
    })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    FetchData();
  }, []);



  return (
    <>
      <h1 className="text-center">Loading Indicator</h1>
        <div>
            <ul>
                {users.map(user => 
                    <li key={user.id}>{user.username}</li>
                )}
            </ul>
            {error && <p className="text-danger">{error}</p>}
            {isLoading && <div className="spinner-border"></div>}
        </div>

    </>
  );
};

export default LoadingIndicator;
