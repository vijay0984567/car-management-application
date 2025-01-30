const Car = require('../models/Car');
const fs = require("fs");
const Image = require('../models/Image');




exports.getImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findById(id);
        if (!image) {
            return res.status(404).send({
                success: false,
                message: "Image not found"
            });
        }
        if (image?.image?.data) {
            res.set("Content-type", image.image.contentType);
            return res.status(200).send(image.image.data);
        }

    } catch (error) {

    }
}