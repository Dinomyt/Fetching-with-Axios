import axios from "axios";
import { useEffect, useState } from "react";

interface User {
    id: number
    name: string
}


const FetchingAxios = () => {
  const [category, setCategory] = useState(5);
  const [data, setData] = useState([]);
  const endpoints = ['posts', 'comments', 'albums', 'photos', 'todos', 'users'];
  const [users, setUsers] = useState<User[]>([]);
  


  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/${endpoints[category]}`)
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, [category, endpoints]);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/${endpoints[category]}`)
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, [category, endpoints]);

  return (
    <>
      <h1 className="text-center">Fetching Data with Axios</h1>
      <div>
        <select className="form-select" onChange={(e) => setCategory(Number(e.target.value))}>
          {endpoints.map((endpoint, index) => (
            <option key={index} value={index}>{endpoint}</option>
          ))}
        </select>
      </div>
      <ul>
        {users.map(user => 
            <li key={user.id}>
                {user.id}{". "}{user.name};
            </li>
        )}
      </ul>
        
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FetchingAxios;
