import { useState } from 'react';
import { useEffect } from 'react';

export default function Users(props) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('/api/users')
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
        <div>
            <ul>
                {userInfo}
            </ul>
        </div>
    )
}

// class Users extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             users: []
//         }
//     }

//     componentDidMount() {
//         fetch('/api/users')
//         .then(res => res.json())
//         .then(users => {
//             this.setState({users: users})
//         })
//     }


//     render() {
//             return (
//                 <ul>
//                     {
//                         this.state.users.map(user => {
//                             <li>Username {user.username}, Age: {user.age}</li>
//                         })
//                     }
//                 </ul>
//             )
//     }
// }

// export default Users;