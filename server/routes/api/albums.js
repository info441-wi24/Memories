import express from 'express';
var router = express.Router();

//gets all albums
router.get('/view', (req, res) => {
    let arrayObj = [
        {
          username: "sona",
          age: 24
        }, 
        {
          username: "test",
          age: 42
        }
      ];
      res.json(arrayObj);
});

//create a new album
router.post('/create', (req, res) => {
  console.log("hey");

  //create client blob beforehand in models, attach blob connection to models, use middleware to help read files, then upload to database
  //once uploaded, return successful


})

export default router;