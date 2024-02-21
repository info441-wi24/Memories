import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomeCard(props) {
    const [users, setUsers] = useState([]);
    const [likeCounter, setLikesCounter] = useState(props.album.likes.length);
    const [like, changeLike] = useState(!props.album.likes.includes("user") ? "🤍" : "❤️")

    let imagePlaceholder;
    let date = new Date(props.album.uploadDate);
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    for (let i = 0 ; i < props.album.photos.length; i++) {
        const image = new Image();
        image.src = props.album.photos[i];
        if (image.width > image.height) {
            imagePlaceholder = props.album.photos[i];
            break;
        }
    }
    

    function onChangeLike(event) {
        props.changeLike(props.album._id);
        if (like == "🤍") {
            setLikesCounter(likeCounter + 1);
            changeLike("❤️")
        } else {
            setLikesCounter(likeCounter - 1);
            changeLike("🤍")
        }
    }

    return (
        <div className="card img-test">
            <img src={props.album.photos[0]} className="card-img-top" alt="album thumbnail"/>
                <div className="card-body">
                    <button className="btn like" onClick={onChangeLike}>{like}</button>
                    <h5 className="card-title">{props.album.name}</h5>
                    <p className="card-subtitle text-body-secondary">unknown user</p>
                    <p className="card-text">Likes: {likeCounter}</p>
                    <p className="card-text"><small className="text-muted">Created: {month[date.getUTCMonth()] + " " + date.getUTCDate() + ", " + date.getUTCFullYear()}</small></p>
                    <Link to={"/album/" + props.album._id} className="btn btn-primary" album={props.album}>Open</Link>
                </div>
        </div>
    )
}