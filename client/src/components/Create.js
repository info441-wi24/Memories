import { useState } from "react"
import { useEffect } from "react";

export default function Create() {
    const [albumName, setAlbumName] = useState("");
    const [albumDescription, setAlbumDescription] = useState("");
    const [photos, setPhotos] = useState([]);
    const [previewUrls, setPreviewUrl] = useState([]);

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
        const formData = new FormData();
        event.preventDefault();

        fetch("api/album/create", {
            method: "POST",
            body: { albumName: albumName, albumDescription: albumDescription, photos: photos }
        });
    }


    return (
        <div className="container">
            <h1 className="mt-4 mb-5">Create New Album</h1>
            <div className="createBox d-flex mb-5">
                <div>

                    <form>
                        <div className="mb-3">
                            <label htmlFor="albumName" className="form-label">Photo Album Name</label>
                            <input type="text" className="form-control" onChange={albumNameChange} value={albumName} placeholder="Kyoto Adventures" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="albumDescription" className="form-label">Photo Album Description</label>
                            <input type="text" className="form-control" onChange={albumDescriptionChange} value={albumDescription} />
                        </div>
                        <div>
                            <label htmlFor="fileUpload" className="form-label">Upload Photos</label>
                        </div>
                        <div className="mb-3">
                            <input type="file" className="form-control-file" onChange={photosChange} accept="image/*" multiple />
                        </div>

                        <button type="submit" onSubmit={submitAction} className="btn btn-primary">Submit</button>
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
                            <div className="col-4 mt-4 mb-4">
                                <img className="imgPreview" key={index} src={url} alt="preview" />
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    )
}