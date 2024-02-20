import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomeCard(props) {
    const [users, setUsers] = useState([]);

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

    return (
        // <div className="album">
        //     <img src={imagePlaceholder} className="thumbnail" alt="album thumbnail"/>
        //     <div className="like">♡</div>
        //     <Link to={"/album/" + props.album._id} album={props.album}>
        //     <div className="album-info">
        //         <h3 className="album-title">{props.album.name}</h3>
        //         <p className="user-info">{props.album.username}</p>
        //     </div>
        //     </Link>
        // </div>
      
        <div className="card img-test">
            <img src={props.album.photos[0]} className="card-img-top" alt="album thumbnail"/>
                <div className="card-body">
                    <h5 className="card-title">{props.album.name}</h5>
                    <p className="card-text">unknown user</p>
                    <p className="card-text"><small className="text-muted">Created: {month[date.getUTCMonth()] + " " + date.getUTCDate() + ", " + date.getUTCFullYear()}</small></p>
                    <Link to={"/album/" + props.album._id} className="btn btn-primary" album={props.album}>Open</Link>
                </div>
        </div>
    )
}