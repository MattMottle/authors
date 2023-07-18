const mongoose = require("mongoose");

const AuthorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Author name is required!"],
        minLength: [3, "Author name must be at least 3 characters!"]
    }
}, {timestamps: true});

module.exports = mongoose.model("Authors", AuthorsSchema);