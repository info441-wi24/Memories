import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { useNavigate } from 'react-router-dom';


export default function Album(props) {
    let params = useParams();
    let albumID = params.id;
    const [album, setAlbum] = useState({});
    const [photos, setPhotos] = useState([]);
    const [index, setIndex] = useState(-1);
    const [commentInput, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const redirect = useNavigate();

    useEffect(() => {
        fetch(`/api/albums/view?id=${albumID}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {        
            setAlbum(data);
            let tempPhotos = []
            data.photos.forEach((photo) => {
                const image = new Image();
                image.src = photo;
                image.onload = () => {
                    tempPhotos.push({src: photo, width: image.width, height: image.height });

                    if (tempPhotos.length === data.photos.length) {
                        setPhotos(tempPhotos); // Once all images are loaded, update state
                    }
                };
            });
        })
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        fetch(`/api/albums/comment?id=${albumID}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let tempComments = data.toReversed().map((comment, index) => {
                return <Comment key={index} comment={comment}/>
            })
            setComments(tempComments);
        })
    }, []);

    function commentChange(event) {
        setComment(event.target.value);
    }    
    
    function submitAction(event) {
        event.preventDefault();
        event.stopPropagation();
        fetch('/api/albums/comment', {
            method: 'POST',
            body: JSON.stringify({comment: commentInput, album: albumID}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let tempComments = comments;
            // tempComments.unshift(<Comment key={index} comment={commentInput}/>);
            // console.log(tempComments);
            // setComments(tempComments);
            // setComment("");
            fetch(`/api/albums/comment?id=${albumID}`)
            .then((res) => res.json())
            .then((data) => {
            let tempComments = data.toReversed().map((comment, index) => {
                return (<Comment key={index} comment={comment}/>)
            }); //this is probably not a good idea lol! also probably should just change the array rather than refetching lol
            setComments(tempComments);
            setComment("");
            })
        })
        .catch(error => console.log(error));
    }

    function deleteAlbum() {
        fetch(`/api/albums/`, {
            method: "DELETE",
            body: JSON.stringify({albumID: albumID}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            redirect("/");
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className='row container py-3'>
            <div>
                    <h1>{album.name}</h1>
                    <h2 className="fs-4">{"@unknown user"}</h2>
                    <p>{album.description}</p>
                    <button onClick={deleteAlbum} className="btn btn-primary mb-3">Delete 🗑️</button>
            </div>
            <div className='col-8'>
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
                    plugins={[Fullscreen, Slideshow, Zoom, Thumbnails]}
                />
            </div>
            <div className='col-4'>
                <h3>Comment Section</h3>
                <div className='border border-3 rounded-3 right'>
                    <div className='p-2'>
                        {comments.length == 0 && <p>No comments yet. Add a comment!</p>}
                        {comments}
                    </div>
                </div>
                <div className='py-4'>
                    <form onSubmit={submitAction}>
                        <textarea type="text" className='form-control' placeholder='Add comment' onChange={commentChange} value={commentInput} required />
                        <div className='py-3'>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </div>
                    </form> 
                </div>
            </div>
        </div>
    )
}