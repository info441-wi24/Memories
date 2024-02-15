import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomeCard(props) {
    const [users, setUsers] = useState([]);
    console.log(props.album._id);

    return (
        <div class="card img-test">
            <img src={props.album.photos[0]} class="card-img-top" alt="album thumbnail"/>
                <div class="card-body">
                    <h5 class="card-title">{props.album.name}</h5>
                    <p class="card-text">{props.album.description}</p>
                    <Link to={"/album/" + props.album._id} className="btn btn-primary" album={props.album}>Open</Link>
                </div>
        </div>
    )
}