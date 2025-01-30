const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Car', carSchema);
