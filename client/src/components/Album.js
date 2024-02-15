import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function Album(props) {
    let params = useParams();
    let albumID = params.id;
    const [album, setAlbum] = useState({});
    const [photos, setPhotos] = useState([]);
    const [index, setIndex] = useState(-1);

    useEffect(() => {
        fetch(`/api/albums/view?id=${albumID}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {        
            setAlbum(data);
            let tempPhotos = data.photos.map((photo) => {
                const image = new Image();
                image.src = photo;
                return { src: photo, width: image.width, height: image.height }
            });
            setPhotos(tempPhotos);
        })
        .catch(error => console.log(error));
      }, []);
     
    return (
        <div className='container'>
        <h1>{album.name}</h1>
        <h2>{album.description}</h2>
        <PhotoAlbum 
            layout='rows' 
            photos={photos} 
            targetRowHeight={300} 
            onClick={({ index: current }) => setIndex(current)}
        />
        <Lightbox
            index={index}
            slides={photos}
            open={index >= 0}
            close={() => setIndex(-1)}
            plugins={[Fullscreen, Slideshow, Zoom, Thumbnails]} //fix thumbnail... its not working
        />
        </div>
    )
}