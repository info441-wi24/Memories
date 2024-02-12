import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
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

export default router;
