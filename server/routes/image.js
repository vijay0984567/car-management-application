const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Assuming auth middleware exis
// Create a car (with image upload and auth)
const  imageController = require('../controllers/imageController');


/**
 * @swagger
 * tags:
 *   name: Images
 *   description: API for managing images
 */

/**
 * @swagger
 * /get-image/{id}:
 *   get:
 *     summary: Get an image by ID
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []  # Require the Bearer token for this API
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Image ID
 *     responses:
 *       200:
 *         description: Image successfully retrieved
 *         content:
 *           image/png:    # You can change this to the appropriate format based on your response type
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       404:
 *         description: Image not found
 *       500:
 *         description: Internal server error
 */
router.get(
    "/get-image/:id",
    auth,  // Middleware to authenticate the token
    imageController.getImage
);

module.exports = router;