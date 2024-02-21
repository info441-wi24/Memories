import { useState } from "react"
import { useEffect } from "react";
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Create(props) {
    const [albumName, setAlbumName] = useState("");
    const [albumDescription, setAlbumDescription] = useState("");
    const [photos, setPhotos] = useState([]);
    const [previewUrls, setPreviewUrl] = useState([]);
    const [alert, setAlert] = useState("");
    const aRef = useRef(null); //reference to file input;
    const redirect = useNavigate();

    if (props.user == undefined || props.user.status == "loggedout") {
        redirect("/")
    }

    useEffect(() => {
        if (!photos || photos.length === 0) {
            setPreviewUrl([]);
            return
        }

        const previewUrlsCopy = [];
        for (let i = 0; i < photos.length; i++) {
            const reader = new FileReader();

            reader.onloadend = () => {
                // Push the preview URL to the array
                previewUrlsCopy.push(reader.result);

                // If all photos have been processed, update state with all preview URLs
                if (previewUrlsCopy.length === photos.length) {
                    setPreviewUrl(previewUrlsCopy);
                }
            };
            reader.readAsDataURL(photos[i]);
        }


    }, [photos]);

    function albumNameChange(event) {
        let newValue = event.target.value
        setAlbumName(newValue);
    }

    function albumDescriptionChange(event) {
        let newValue = event.target.value;
        setAlbumDescription(newValue);
    }

    function photosChange(event) {
        setPhotos([...event.target.files]);
    }

    function submitAction(event) {
        event.preventDefault();
        event.stopPropagation();
        const formData = new FormData();
        formData.append('name', props.user.userInfo.name);
        formData.append('username', props.user.userInfo.username);
        formData.append('albumName', albumName);
        formData.append('albumDescription', albumDescription);
        photos.forEach((photo, index) => {
            formData.append(`photo${index}`, photo);
        })

        setAlert("Uploading your album...");
        fetch("api/albums/create", {
            method: "POST",
            body: formData
        })
        .then((data) => {
            return data.json();
        })
        .then((object) => {
            console.log(object.savedAlbum._id);
            redirect("/album/" + object.savedAlbum._id);
            setPreviewUrl([]);
            setPhotos([]);
            setAlbumName("");
            setAlbumDescription("");
            aRef.current.value = null;
            setAlert("Your album has been successfully uploaded!");
        }).catch((err) => console.log(err)); 
    }


    return (
        <div className="container">
            <h1 className="mt-4 mb-5">Create New Album</h1>
            <div className="createBox d-flex mb-5">
                <div>
                    <form onSubmit={submitAction}>
                        <div className="mb-3">
                            <label htmlFor="albumName" className="form-label">Photo Album Name</label>
                            <input type="text" className="form-control" onChange={albumNameChange} value={albumName} placeholder="Kyoto Adventures" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="albumDescription" className="form-label">Photo Album Description</label>
                            <input type="text" className="form-control" onChange={albumDescriptionChange} value={albumDescription} required/>
                        </div>
                        <div>
                            <label htmlFor="fileUpload" className="form-label">Upload Photos</label>
                        </div>
                        <div className="mb-3">
                            <input ref={aRef} type="file" className="form-control-file" onChange={photosChange} accept="image/*" multiple required/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <p className="alert">{alert}</p>
                    </form>
                </div>
            </div>
            <div>
                <h2>
                    Preview Photos:
                </h2>
                <div className="row">
                    {previewUrls && previewUrls.map((url, index) => {
                        return (
                            <div key={index} className="col-4 mt-4 mb-4">
                                <img className="imgPreview" src={url} alt="preview" />
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    )
}