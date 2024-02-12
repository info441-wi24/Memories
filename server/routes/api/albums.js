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

})

export default router;