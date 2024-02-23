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
    const [album, setAlbum] = useState({likes: []});
    const [photos, setPhotos] = useState([]);
    const [index, setIndex] = useState(-1);
    const [commentInput, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [like, changeLike] = useState("");
    const redirect = useNavigate();

    useEffect(() => {
        fetch(`/api/albums/view?id=${albumID}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {        
            setAlbum(data);
            
            //adding photos
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
        //useEffect at the very start of component's life
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

    useEffect(() => {
        //useEffect ONLY when album changes!
            if (props.user.status == "loggedin" && album.likes.includes(props.user.userInfo.username)) {
                changeLike("Already Liked ❤️");
            } else {
                changeLike("Like 🤍");
            }
        
    }, [album])

    function likeChange(event) {
        try {
            fetch(`/api/albums/like?id=${albumID}`, {
                method: "POST",
                body: JSON.stringify({albumID: albumID}),
            })
            .catch(error => console.log(error));
            if (like == "Already Liked ❤️") {
                changeLike("Like 🤍");
            } else {
                changeLike("Already Liked ❤️");
            } 
        } catch (error) {
            console.log(error);
        }
    }

    function commentChange(event) {
        setComment(event.target.value);
    }    
    
    function submitAction(event) {
        event.preventDefault();
        event.stopPropagation();
        fetch('/api/albums/comment', {
            method: 'POST',
            body: JSON.stringify({comment: commentInput, album: albumID, username: props.user.userInfo.name}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let tempComments = comments;
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
                    <h1>{album.albumName}</h1>
                    <h2 className="fs-4">{album.username}</h2>
                    <p>{album.description}</p>
                    {props.user.status == "loggedin" && album.username == props.user.userInfo.username 
                    && <button onClick={deleteAlbum} className="btn btn-primary mb-3 me-2">Delete 🗑️</button>
                    }
                    {props.user.status == "loggedin" && like == "Already Liked ❤️"
                    && <button onClick={likeChange} className="btn btn-secondary mb-3">{like}</button>
                    }
                    {props.user.status == "loggedin" && like == "Like 🤍"
                    && <button onClick={likeChange} className="btn btn-danger mb-3">{like}</button>
                    }
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
                        {comments.length == 0 && props.user.status == "loggedout" && <p>No comments yet. Login to add a comment!</p>}
                        {comments.length == 0 && props.user && props.user.status == "loggedin" && <p>No comments yet. Add a comment!</p>}
                        {comments}
                    </div>
                </div>
                {props.user.status == "loggedin" &&
                <div className='py-4'>
                    <form onSubmit={submitAction}>
                        <textarea type="text" className='form-control' placeholder='Add comment' onChange={commentChange} value={commentInput} required />
                        <div className='py-3'>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </div>
                    </form> 
                </div>
                }
            </div>
        </div>
    )
}