import React, { useState, useEffect } from "react";
import HomeCard from "./HomeCard";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useRef } from 'react';
// import Warper from './Warper';


export default function Profile(props) {

    const [userBio, setUserBio] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [albums, setAlbums] = useState("");
    const redirect = useNavigate();

    console.log(props);
    
    if (props.user == undefined || props.user.status == "loggedout") {
        redirect("/")
    }


    const user_id = props.user.userInfo.username.split("@")[0];


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
        console.log("use effect");
        let photoAlbums = [];
        fetch(`/api/profile?username=${props.user.userInfo.username}`)
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((data) => {
                console.log("worked");
                photoAlbums = data.albums.toReversed().map((album, index) => {
                    return (
                        <HomeCard
                            key={index}
                            album={album}
                            changeLike={changeLike}
                            user={props.user}
                        />
                    );
                });
                setAlbums(photoAlbums);
                setUserBio(data.user[0].biography)
                setProfilePhoto(data.user[0].profilePhoto)
            })
            .catch((error) => console.log(error));
    }, [props.user]);






    return (
        <div className="profile-album">
            <h1 className="page-heading">
                {props.user.userInfo.name.split(" ")[0]}'s Album
            </h1>

            <div className="container">
                <div className="profile">
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

                <div className="albums">
                    <div className="profile-card row col-lg-3 col-md-6 col-sm-12s">
                        {albums}
                    </div>
                </div>
            </div>
        </div>
    );
}
