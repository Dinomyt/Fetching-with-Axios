import React, { useEffect, useState } from "react";
import { User, create } from "../Services/httpService"

const CRUD = () => {
    const userService = create("/users");
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [editedName, setEditedName] = useState<string>("");
    const [editedUsername, setEditedUsername] = useState<string>("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setIsLoading(true);
        userService.getAll<User>().then(
            (response) => {
                setUsers(response.data);
                setIsLoading(false);
            },
            (error) => {
                setError(error.message);
                setIsLoading(false);
            }
        );
    };

    const userDelete = (user: User) => {
        userService.delete(user.id).then(
            () => {
                setUsers(users.filter((u) => u.id !== user.id));
            },
            (error) => {
                setError(error.message);
            }
        );
    };

    const startEditing = (user: User) => {
        setEditingUser(user);
        setEditedName(user.name);
        setEditedUsername(user.username);
    };

    const cancelEditing = () => {
        setEditingUser(null);
        setEditedName("");
        setEditedUsername("");
    };

    const addUser = () => {
        const newUser: User = { id: Math.max(...users.map((u) => u.id)) + 1, name: "New User", username: "newuser" };
        setUsers([newUser, ...users]);
        userService.create(newUser).then(
            (response) => {
                setUsers([response.data, ...users]);
            },
            (error) => {
                setError(error.message);
                setUsers(users.filter((u) => u.id !== newUser.id)); // Revert state if post fails
            }
        );
    };

    const handleUpdate = () => {
        if (editingUser) {
            const updatedUser: User = { ...editingUser, name: editedName, username: editedUsername };
            userService.update(updatedUser).then(
                (response) => {
                    setUsers(users.map((u) => (u.id === editingUser.id ? response.data : u)));
                    cancelEditing();
                },
                (error) => {
                    setError(error.message);
                }
            );
        }
    };

    return (
        <>
            <h1 className="text-center">CRUD Add and Update with Axios</h1>
            <div>
                <button className="btn btn-outline-primary mx-3 mb-3" onClick={addUser}>
                    Add
                </button>
                <ul className="list-group">
                    {users.map((user) => (
                        <li className="list-group-item d-flex justify-content-between" key={user.id}>
                            {user.username}
                            <div>
                                <button onClick={() => startEditing(user)} className="btn btn-outline-primary mr-2">
                                    Edit
                                </button>
                                <button onClick={() => userDelete(user)} className="btn btn-outline-danger">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                {error && <p className="text-danger">{error}</p>}
                {isLoading && <div className="spinner-border"></div>}
            </div>

            {editingUser && (
                <div className="edit-form">
                    <h2>Edit User</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdate();
                        }}
                    >
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={editedUsername}
                                onChange={(e) => setEditedUsername(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={cancelEditing}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default CRUD;
