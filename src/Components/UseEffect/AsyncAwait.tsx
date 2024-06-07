import { useEffect, useState } from "react";

interface User {
    id: number
    name: string
}

const AsyncAwait = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [category, setCategory] = useState(5);
    const endpoints = ['posts', 'comments', 'albums', 'photos', 'todos', 'users'];
    
    const fetchData = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoints[category]}`);
            if(!response.ok){
                throw new Error(`Http error: Status: ${response.status}`);
            }
            const data = await response.json();
            setUsers(data);
        } catch (error:any) {
            console.log(error.message);
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    

    return (
    <>
        <h1 className="text-center">Fetching Data with Async Await and handling errors</h1>
        <div>
            <ul>
                {error && <p>{error}</p>}
                {users.map(user => 
                    <li key={user.id}>{user.name}</li>
                )}
            </ul>
        </div>
    </>
  )
}

export default AsyncAwait