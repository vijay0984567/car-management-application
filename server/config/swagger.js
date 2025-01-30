const swaggerJsdoc = require('swagger-jsdoc');

// Swagger definition
const swaggerDefinition = {
    openapi: "3.0.0", // Use OpenAPI 3.0 standard
    info: {
        title: "Node.js API Documentation", // API title
        version: "1.0.0", // Version
        description: "API documentation for Car Management Application", // Short description
    },
    servers: [
        {
            url: "https://car-management-application-olt8.onrender.com", // Your server URL
            description: "Development server",
        },
    ],
};

// Options for Swagger docs
const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"], // Path to the API docs (adjust according to your project structure)
};

// Generate Swagger docs
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
