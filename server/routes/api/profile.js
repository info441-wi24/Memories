import express from 'express';
var router = express.Router();

router.get("/", async (req, res) => {
    try {
            const existingUser = await req.models.User.findOne({ username: req.query.username });
            let allAlbums = await req.models.Album.find({ username: req.query.username  });  // Filter by user

            // Combine the album and user data
            let combinedData = {
                albums: allAlbums,
                user: existingUser
            };

            res.json(combinedData).status(201);
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "erorr", error: error.message });
    }

});


router.post("/", async (req, res) => {
    const username = req.body.username;
    const biography = req.body.biography;
    const profilePhoto = req.body.profilePhoto;
    console.log("req.body")
    console.log(req.body.profilePhoto)

    try {
        if (!req.session.isAuthenticated) {
            res.json({ status: "error", error: "not logged in" }).status(401);
        }
        else {
            await req.models.User.updateOne({ username }, { $set: { biography } }, { $set: { profilePhoto } });
            res.json({ status: "success", action: "update" });
    
        }


    } catch (error) {
        console.log(error);
        res.json({ status: "error" }).status(500);
    }

});



export default router;


