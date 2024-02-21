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
        if (props.searchTerm == 0) {
            fetch('/api/albums/view')
            .then((res) => {
                return res.json();
            })
            .then((data) => {            
                photoAlbums = data.toReversed().map((album, index) => {
                return <HomeCard key={index} album={album} changeLike={changeLike} />
            });
                setAlbums(photoAlbums);
            })
            .catch(error => console.log(error));
        } else {
            fetch(`/api/albums/view?search=${props.searchTerm}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {            
                console.log(data);
                photoAlbums = data.toReversed().map((album, index) => {
                return <HomeCard key={index} album={album} changeLike={changeLike} />
            });
                setAlbums(photoAlbums);
            })
            .catch(error => console.log(error));
        }
      }, [props.searchTerm]);

    return (
        <div className='justify-content-center container'>
            <h1 className="mt-3">Gallery</h1>
            <div className="gallery">
                {albums}
            </div>
        </div>
    )
}