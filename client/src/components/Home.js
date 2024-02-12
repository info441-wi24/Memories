import { useState } from 'react';
import { useEffect } from 'react';

export default function Users(props) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('/api/albums/view')
        .then((res) => {
            return res.json();
        })
        .then((users) => {
            setUsers(users);
        })
        .catch(error => console.log(error));
      }, []);

    let userInfo = users.map((user) => {
        return <li key={user.username}>Username {user.username}, Age: {user.age}</li>
    });


    return (
        <div className='justify-content-center'>
            <h1>This is the homescreen!</h1>
            <ul>
                {userInfo}
            </ul>
        </div>
    )
}