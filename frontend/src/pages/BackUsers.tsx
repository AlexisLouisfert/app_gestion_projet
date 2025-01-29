import { useEffect, useState } from "react";

export function BackUsers() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetchUsers() {
            const data = await fetch("http://localhost:3000/users")
                .then(res => res.json())
                console.log(data);
                
            setUsers(data)
        }
        fetchUsers()
    }, [])

    return (
        <>
            <h1>List of Users:</h1>
            <ul>
                {users.map((user: any) => (
                    <li key={user._id}>
                        {user.name} {user.email}
                    </li>
                ))}
            </ul>
        </>
    );
}