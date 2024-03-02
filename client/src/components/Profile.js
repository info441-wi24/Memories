import React, { useState, useEffect } from "react";
import HomeCard from "./HomeCard";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useRef } from 'react';
// import Warper from './Warper';


export default function Profile(props) {

    const [name, setName] = useState("");
    const [userBio, setUserBio] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [albums, setAlbums] = useState("");
    const param = useParams();
    const redirect = useNavigate();
    
    // if (props.user == undefined || props.user.status == "loggedout") {
    //     redirect("/")
    // }

    let user_id = "";
    if (param.id != undefined) {
        user_id = param.id.split("@")[0];
    }

    function changeLike(albumID) {
        try {
            fetch(`/api/albums/like?id=${albumID}`, {
                method: "POST",
                body: JSON.stringify({ albumID: albumID }),
            }).catch((error) => console.log(error));
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        let photoAlbums = [];
        fetch(`/api/profile?username=${param.id}@uw.edu`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                photoAlbums = data.albums.toReversed().map((album, index) => {
                    return (
                        <div key={index} className="col-lg-4 mb-4">
                            <HomeCard
                                key={index}
                                album={album}
                                changeLike={changeLike}
                                user={props.user}
                            />
                        </div>
                    );
                });
                console.log(data);
                setAlbums(photoAlbums);
                setName(data.user.name.split(" ")[0]);
                setUserBio(data.user.biography);
                // setProfilePhoto(data.user.profilePhoto);
            })
            .catch((error) => console.log(error));
    }, [props.user]);



    return (
        <div className="profile-album">
            <h1 className="page-heading">
                {name}'s Albums
            </h1>

            <div className="container row">
                <div className="profile col-4">
                    <div className="photo-username">
                        <img src={profilePhoto} width="300" height="300"></img>
                        <p className="profile-username">
                            <strong>@{user_id}</strong>
                        </p>
                    </div>
                    <div className="biography">
                        <div className="about-me">
                            <p><strong>About Me!</strong></p>
                            <p className="user-bio">{userBio ? userBio : "Start writing about yourself!"}</p>
                        </div>

                        <div className="bio-container">
                            <Link to="/edit" className="bio-btn"><p>Edit Profile</p></Link>
                        </div>


                    </div>
                </div>

                <div className="albums col-8">
                    <div className="profile-card cards row d-flex d-wrap">
                            {albums}
                    </div>
                </div>
            </div>
        </div>
    );
}
