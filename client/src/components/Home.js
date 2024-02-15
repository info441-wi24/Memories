import { useState } from 'react';
import { useEffect } from 'react';
import HomeCard from './HomeCard';

export default function Home(props) {
    const [albums, setAlbums] = useState([]);
    let photoAlbums = [];

    useEffect(() => {
        fetch('/api/albums/view')
        .then((res) => {
            return res.json();
        })
        .then((data) => {            
            photoAlbums = data.map((album, index) => {
            return <HomeCard key={index} album={album} />
        });
            setAlbums(photoAlbums);
        })
        .catch(error => console.log(error));
      }, []);

    // let userInfo = users.map((user) => {
    //     return <li key={user.username}>Username {user.username}, Age: {user.age}</li>
    // });

    console.log(photoAlbums);


    return (
        <div className='justify-content-center container'>
            <h1>This is the homescreen!</h1>
            {albums}
            {/* <ul>
                {userInfo}
            </ul> */}
        </div>
    )
}