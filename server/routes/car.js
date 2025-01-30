const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const auth = require('../middleware/auth'); // Assuming auth middleware exists
const formidable = require("express-formidable");

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: API for managing cars
 */

/**
/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     parameters:
 *       - in: Headers
 *         name: Authorization
 *         description: Bearer token to authorize the request
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer your-jwt-token"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: string
 *                 description: JSON string of tags
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Car created successfully
 *       500:
 *         description: Internal server error
 */
router.post(
    "/",
    auth,  // Middleware to authenticate the token
    formidable({ multiples: true }),
    carController.createCar
);


/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get all cars for the logged-in user
 *     tags: [Cars]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token to authorize the request
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer your-jwt-token"
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search keyword for filtering cars
 *     responses:
 *       200:
 *         description: List of cars
 *       500:
 *         description: Internal server error
 */
router.get('/', auth, carController.getCars);

/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Get a specific car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token to authorize the request
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer your-jwt-token"
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Car ID
 *     responses:
 *       200:
 *         description: Car details
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', carController.getCarById);

/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Update a specific car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token to authorize the request
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer your-jwt-token"
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Car ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: string
 *                 description: JSON string of tags
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', auth, formidable({ multiples: true }), carController.updateCar);

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token to authorize the request
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer your-jwt-token"
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Car ID
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', auth, carController.deleteCar);

module.exports = router;
