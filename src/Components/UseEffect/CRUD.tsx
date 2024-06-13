import axios from "axios";
import { useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
    username: string;
}

const CRUD = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [editedName, setEditedName] = useState("");
    const [editedUsername, setEditedUsername] = useState("");

    // Fetch users data
    const fetchData = () => {
        setIsLoading(true);
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setUsers(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Delete a user
    const userDelete = (user: User) => {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${user.id}`)
            .then(() => {
                setUsers(users.filter(u => u.id !== user.id));
            })
            .catch(error => {
                setError(error.message);
            });
    };

    // Start editing a user
    const startEditing = (user: User) => {
        setEditingUser(user);
        setEditedName(user.name);
        setEditedUsername(user.username);
    };

    // Cancel editing
    const cancelEditing = () => {
        setEditingUser(null);
        setEditedName("");
        setEditedUsername("");
    };

    // Add a new user
    const addUser = () => {
        const newUser = { id: Math.max(...users.map(u => u.id)) + 1, name: 'New User', username: 'newuser' };
        setUsers([newUser, ...users]);
        axios.post('https://jsonplaceholder.typicode.com/users', newUser)
            .then(response => {
                setUsers([response.data, ...users]);
            })
            .catch(error => {
                setError(error.message);
                setUsers(users.filter(u => u.id !== newUser.id));  // Revert state if post fails
            });
    };

    // Update a user
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
    };

    return (
        <>
            <h1 className="text-center">CRUD Add and Update with Axios</h1>
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

export default CRUD;
