import express from 'express';
var router = express.Router();

import multer from 'multer';
import MulterAzureStorage from 'multer-azure-storage';
import { BlobServiceClient } from '@azure/storage-blob';
import { model } from 'mongoose';

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

    console.log(req.body);

    let newAlbum = new req.models.Album({
      name: req.body.name,
      username: req.body.username,
      albumName: req.body.albumName,
      description: req.body.albumDescription,
      photos: photoURLS,
      likes: []
    }) //date is already placed in because of model

    newAlbum.save()
    .then((savedAlbum) => {
      res.status(201).json({status: "success", savedAlbum: savedAlbum})
    })
    .catch((error) => {
      res.json({status: "error"}).status(500);
    });
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
  let albumSearch = req.query.search;
  try {
    if (albumID) {
      let album = await req.models.Album.findById(albumID);
      res.json(album).status(201);
    } else if (albumSearch) {
      let allAlbums = await req.models.Album.find();
      let albumsMatch = [];
      for (let album of allAlbums) {
        if (album.albumName.toLowerCase().includes(albumSearch.toLowerCase()) || album.username.includes(albumSearch)) {
          albumsMatch.push(album);
        }
      }
      res.json(albumsMatch).status(201);
    }
    else {
      let allAlbums = await req.models.Album.find();
      res.json(allAlbums).status(201);
    }
  } catch (error) {
    console.log(error);
    res.json({status: "error"}).status(500);
  }
});

router.delete('/', async (req, res) => {
  let albumID = req.body.albumID;
  console.log(req.body);
  // if (!req.session.isAuthenticated) {
  //     res.json({status: "error", error: "not logged in"}).status(401);
  // }

  try {
      // if (req.session.account.username != post.username) {
      //     res.json({
      //         status: 'error',
      //         error: "you can only delete your own posts"
      //      });
      // }

      // let comments = await req.models.Comment.find({
      //   album: albumID
      // });
      
      await req.models.Comment.deleteMany({album: albumID});
      await req.models.Album.deleteOne({_id: albumID});
      res.json({status: "success"});
  } catch (error) {
      console.log(error);
      res.status(500).json({"status": "error", "error": error});

  }
});

router.post('/like', async (req, res) => {
  let albumID = req.query.id;
  try {
      let album = await req.models.Album.findById(albumID);

      if (!album.likes.includes("user")) { //change to req.session.account.username later
          await album.likes.push("user");
      } else {
          await req.models.Album.updateOne(
            {_id: albumID},
            { $pull : {likes: "user"}} //change to req.session.account.username later
          );
      }

      await album.save();
      res.json({status: "success"});
  } catch(error) {
      console.log(error);
      res.status(500).json({"status": "error", "error": error});
  }

});

router.post("/comment", async (req, res) => {
  try {
    let newComment = new req.models.Comment({
        username: req.body.username,
        comment: req.body.comment,
        album: req.body.album,
    });
    await newComment.save();
    res.json({status: "success"}).status(201);
  } catch (error) {
    res.json({status: "error"}).status(500);
    console.log(error);
  }
});

router.get("/comment", async (req, res) => {
  let albumID = req.query.id;
  try {
    let comments = await req.models.Comment.find({
      album: albumID
    });
    res.json(comments).status(201);
  } catch(error) {
    res.json({status: "error"}).status(500);
    console.log(error);
  }
})




export default router;