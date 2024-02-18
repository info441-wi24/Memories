import { useState } from 'react';
import { useEffect } from 'react';
import HomeCard from './HomeCard';

export default function Home(props) {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        let photoAlbums = [];
        if (props.searchTerm == 0) {
            console.log("no term")
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
        } else {
            console.log("term")
            fetch(`/api/albums/view?search=${props.searchTerm}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {            
                console.log(data);
                photoAlbums = data.map((album, index) => {
                return <HomeCard key={index} album={album} />
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