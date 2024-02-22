import { useState } from 'react';
import { useEffect } from 'react';
import HomeCard from './HomeCard';

export default function Home(props) {
    const [albums, setAlbums] = useState([]);

    function changeLike(albumID) {
        try {
            fetch(`/api/albums/like?id=${albumID}`, {
                method: "POST",
                body: JSON.stringify({albumID: albumID}),
            })
            .catch(error => console.log(error))   
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let photoAlbums = [];
            //probably faster just to look throuh albums you have already, but just want to make sure to always get updated version from server
            fetch(`/api/albums/view?search=${props.searchTerm}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {            
                photoAlbums = data.toReversed().map((album, index) => {
                return <HomeCard key={index} album={album} changeLike={changeLike} user={props.user}/>
            });
                setAlbums(photoAlbums);
            })
            .catch(error => console.log(error));
        
      }, [props.searchTerm]);

      useEffect(() => {
        let photoAlbums = [];
            fetch('/api/albums/view')
            .then((res) => {
                return res.json();
            })
            .then((data) => {            
                photoAlbums = data.toReversed().map((album, index) => {
                return <HomeCard key={index} album={album} changeLike={changeLike} user={props.user} />
            });
                setAlbums(photoAlbums);
            })
            .catch(error => console.log(error));
      }, [props.user]);

    return (
        <div className='justify-content-center container'>
            <h1 className="mt-3">Gallery</h1>
            <div className="gallery">
                {albums}
            </div>
        </div>
    )
}