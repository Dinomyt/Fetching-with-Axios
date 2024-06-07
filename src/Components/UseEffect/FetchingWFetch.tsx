import { useEffect, useState } from "react";

interface User {
  id: number
  name: string
}

const FetchingWFetch = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [category, setCategory] = useState(5);
  const endpoints = ['posts', 'comments', 'albums', 'photos', 'todos', 'users'];
  

  const fetchUserData = () => {
    fetch(`https://jsonplaceholder.typicode.com/${endpoints[category]}`)
    .then(response => response.json())
    .then(data => setUsers(data))
    .catch(error => console.error("Error fetching data:", error));
  }

  useEffect(() => {
    fetchUserData();
  }, [])
  
  return (
    <>
        <h1 className="text-center">Fetching Data using Fetch</h1>
        <div>
          <ul>
            {users.map(user => 
            <li key={user.id}>
              {user.id + ". " + user.name}
            </li>)}
          </ul>
        </div>
    </>
  )
}

export default FetchingWFetch