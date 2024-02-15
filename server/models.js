import mongoose from "mongoose";

let models = {}

await mongoose.connect("mongodb+srv://jnguyen860:12345678a@memories.hqiftv7.mongodb.net/memories");
  

const userSchema = mongoose.Schema({
    username: String,
    biography: String
})

const albumSchema = mongoose.Schema({
    // username: String,
    name: String,
    description: String,
    photos: [String],
    likes: [String],
    uploadDate: { type: Date, default: Date.now }
});

const commentSchema = mongoose.Schema({
    username: String,
    comment: String,
    album: {type: mongoose.Schema.Types.ObjectId, ref: "Album"},
    uploadDate: { type: Date, default: Date.now }
});

models.User = mongoose.model("User", userSchema);
models.Album = mongoose.model("Album", albumSchema);
models.Comment = mongoose.model("Comment", commentSchema);

export default models;