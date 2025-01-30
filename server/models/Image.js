const mongoose = require('mongoose');

const imgSchema = new mongoose.Schema({
    image: { data: Buffer, contentType: String },
    imageName: { type: String }
});


const Image = mongoose.model('Image', imgSchema);

module.exports = Image;