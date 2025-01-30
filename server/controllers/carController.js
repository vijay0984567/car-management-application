const Car = require('../models/Car');
const fs = require("fs");
const Image = require('../models/Image');
// Create Car
exports.createCar = async (req, res) => {
    try {
        const { title, description, tags } = req.fields;
        const images = req.files.images;

        console.log(images)
        // Ensure tags is an array (in case it comes as a string from the frontend)
        const parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags || '[]');
        // Validation

        const imageDocs = [];

        // Normalize `images` to always be an array
        const normalizedImages = Array.isArray(images) ? images : [images];

        for (const image of normalizedImages) {
            const newImg = new Image({});
            console.log("newImg", newImg);

            // Read the image file and store it in the database
            newImg.image.data = fs.readFileSync(image.path);
            newImg.image.contentType = image.type;
            newImg.imageName = image.name;

            // Save the image document
            await newImg.save();

            // Store the image ID in the `imageDocs` array
            imageDocs.push(newImg._id);
        }

        // `imageDocs` now contains the IDs of all stored images


        // Create car document
        const car = new Car({
            title,
            description,
            tags: parsedTags,
            images: imageDocs,  // Store references to images
            user: req.user._id
        });

        await car.save();
        res.status(201).send({
            success: true,
            message: "Car created successfully",
            car,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in creating car",
            error,
        });
    }
};
// Get all cars for the logged-in user with optional search
exports.getCars = async (req, res) => {
    try {
        const { keyword } = req.query;
        const query = { user: req.user._id };

        // If a search keyword is provided, add a search condition
        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { tags: { $regex: keyword, $options: 'i' } }
            ];
        }

        const cars = await Car.find(query);
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific car by ID
exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findOne({ _id: req.params.id });
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Update a specific car by ID
exports.updateCar = async (req, res) => {
    try {
        const { id } = req.params; // Car ID from the request
        const { title, description, tags } = req.fields;
        const images = req.files?.images; // Uploaded images (optional)

        // Find the car to update
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).send({ success: false, message: "Car not found" });
        }

        // Normalize tags
        const parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags || '[]');

        // Update fields if provided
        if (title) car.title = title;
        if (description) car.description = description;
        if (tags) car.tags = parsedTags;

        // Handle images if provided
        if (images) {
            const imageDocs = [];
            const normalizedImages = Array.isArray(images) ? images : [images];

            for (const image of normalizedImages) {
                const newImg = new Image({});
                newImg.image.data = fs.readFileSync(image.path);
                newImg.image.contentType = image.type;
                newImg.imageName = image.name;

                // Save the new image document
                await newImg.save();
                imageDocs.push(newImg._id);
            }

            // Add new images to the existing images array
            car.images = [...car.images, ...imageDocs];
        }

        // Save the updated car
        await car.save();

        res.status(200).send({
            success: true,
            message: "Car updated successfully",
            car,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error updating car",
            error,
        });
    }
};
// Delete a specific car by ID
exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
