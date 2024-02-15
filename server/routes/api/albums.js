import express from 'express';
var router = express.Router();

import multer from 'multer';
import MulterAzureStorage from 'multer-azure-storage';
import { BlobServiceClient } from '@azure/storage-blob';

// Set up Azure Blob Storage
const connectionString = 'DefaultEndpointsProtocol=https;AccountName=info441photoalbum;AccountKey=I4btGGARHrjyqEIzQk2jREkKn854kdsTtjzCIzCs9Az8T4iXtWhwUsEXU8tsEgQNt4/xeqo8voZc+AStlwxsYA==;EndpointSuffix=core.windows.net';
const containerName = 'images';

// const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString); //connects to the storage
// const containerClient = blobServiceClient.getContainerClient(containerName); //connects to the blob container

const upload = multer({
    storage: new MulterAzureStorage({
      azureStorageConnectionString: connectionString,
      containerName: 'images',
      containerSecurity: 'blob'
    })
  });


//create a new album
router.post('/create', upload.any(), async (req, res) => { //any() just uploads everything in formData from the client side
  try {
    const files = req.files; //after uploading, its put in files field
    let photoURLS = [];
    for (let file of files) {
      photoURLS.push(file.url);
    }

    let newAlbum = new req.models.Album({
      name: req.body.albumName,
      description: req.body.albumDescription,
      photos: photoURLS,
      likes: []
    }) //date is already placed in because of model

    newAlbum.save();
    res.status(201).json({status: "success"})
  } catch (error) {
    console.log(error);
    res.json({status: "error"}).status(500);
  }
  //create client blob beforehand in models, attach blob connection to models, use middleware to help read files, then upload to database
  //once uploaded, return successful
});

router.get("/view", async (req, res) => {
  // this one gets all the photo albums and displays on home screen UNLESS THERE IS A QUERY PARAMETER!!!
  let albumID = req.query.id;
  console.log(albumID);
  try {
    if (albumID) {
      let album = await req.models.Album.findById(albumID);
      res.json(album).status(201);
    } else {
      let allAlbums = await req.models.Album.find();
      res.json(allAlbums).status(201);
    }
  } catch (error) {
    res.json({status: "error"}).status(500);
  }

});


export default router;