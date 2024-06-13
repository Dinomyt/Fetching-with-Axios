import { useEffect, useState } from "react";
// import apiClient, {CanceledError} from "../../Services/apiClient";
import axios from "axios";

interface User {
    id: number;
    name: string;
    username: string;
}

const CreateData = () => {
    const [category, setCategory] = useState(5);
    const [data, setData] = useState([]);
    const endpoints = ['posts', 'comments', 'albums', 'photos', 'todos', 'users'];
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [editedName, setEditedName] = useState("");
    const [editedUsername, setEditedUsername] = useState("");

    const FetchData = () => {
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

    const userDelete = (user: User) => {
        setUsers(users.filter(u => u.id !== user.id));
    }

    const startEditing = (user: User) => {
        setEditingUser(user);
        setEditedName(user.name);
        setEditedUsername(user.username);
    }

    const cancelEditing = () => {
        setEditingUser(null);
        setEditedName("");
        setEditedUsername("");
    }

    const addUser = () => {
        const orginalUsers = [...users];
        const newUser = {id:0, name: 'Aaron', username: 'asdf'};
        setUsers([newUser, ...users]);
        axios.post(`https://jsonplaceholder.typicode.com/users`, newUser)
            .then(response => setUsers([response.data,...users]))
            .catch(error => {
                setError(error.message);
                setUsers(orginalUsers);
                setIsLoading(false);
            })
    } 

    const handleUpdate = () => {
        if (editingUser) {
            const updatedUser = { ...editingUser, name: editedName, username: editedUsername };
            axios.put(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, updatedUser)
                .then(response => {
                    setUsers(users.map(u => u.id === editingUser.id ? response.data : u));
                    cancelEditing();
                })
                .catch(error => {
                    setError(error.message);
                });
        }
    }

    return (
        <>
            <h1 className="text-center">Crud Add and Update with apiClient</h1>
            <div>
                <button className="btn btn-outline-primary mx-3 mb-3" onClick={addUser}>Add</button>
                <ul className="list-group">
                    {users.map(user =>
                        <li className="list-group-item d-flex justify-content-between" key={user.id}>
                            {user.username}
                            <div>
                                <button onClick={() => startEditing(user)} className="btn btn-outline-primary mr-2">Edit</button>
                                <button onClick={() => userDelete(user)} className="btn btn-outline-danger">Delete</button>
                            </div>
                        </li>
                    )}
                </ul>
                {error && <p className="text-danger">{error}</p>}
                {isLoading && <div className="spinner-border"></div>}
            </div>

            {editingUser && (
                <div className="edit-form">
                    <h2>Edit User</h2>
                    <form onSubmit={e => { e.preventDefault(); handleUpdate(); }}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" value={editedName} onChange={e => setEditedName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" value={editedUsername} onChange={e => setEditedUsername(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" className="btn btn-secondary" onClick={cancelEditing}>Cancel</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default CreateData;
