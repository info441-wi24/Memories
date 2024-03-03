import mongoose from "mongoose";

let models = {}

await mongoose.connect("mongodb+srv://jnguyen860:12345678a@memories.hqiftv7.mongodb.net/memories");
  

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    biography: String,
    profilePhoto: String
})

const albumSchema = mongoose.Schema({
    name: String,
    username: String,
    albumName: String,
    description: String,
    photos: [String],
    likes: [String],
    tags: [String],
    uploadDate: { type: Date, default: Date.now },
    isPrivate: Boolean,
    invitedUsers: [String]
});

const commentSchema = mongoose.Schema({
    username: String,
    email: String,
    comment: String,
    album: String,
    uploadDate: { type: Date, default: Date.now }
});

models.User = mongoose.model("User", userSchema);
models.Album = mongoose.model("Album", albumSchema);
models.Comment = mongoose.model("Comment", commentSchema);

export default models;