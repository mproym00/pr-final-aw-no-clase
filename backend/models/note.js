const mongoose = require("mongoose");

const note = new mongoose.Schema({
    title: String,
    description: String,
    user: Object
});
const Objeto = mongoose.model('notes', note);

module.exports = Objeto;