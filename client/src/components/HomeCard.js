import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomeCard(props) {
    const [users, setUsers] = useState([]);
    console.log(props.album._id);

    return (
        <div className="card img-test">
            <img src={props.album.photos[0]} className="card-img-top" alt="album thumbnail"/>
                <div className="card-body">
                    <h5 className="card-title">{props.album.name}</h5>
                    <p className="card-text">{props.album.description}</p>
                    <Link to={"/album/" + props.album._id} className="btn btn-primary" album={props.album}>Open</Link>
                </div>
        </div>
    )
}