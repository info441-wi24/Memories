import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get("/myInfo", (req, res) => {
    try {
        if (!req.session.isAuthenticated) {
            res.json({status: "loggedout"});
        } else {
            res.json({
                status: "loggedin", 
                userInfo: {
                    name: req.session.account.name,
                    username: req.session.account.username   
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
});

export default router;
