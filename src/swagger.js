const swaggerJsdoc = require("swagger-jsdoc");


const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "PinturilloApp API with swagger",
            version: "1.0.0",
            description: "This is an API REST application made with Express and documented with Swagger",
            termsOfService: "http://swagger.io/terms/",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "PinturilloApp"
            },
        },
        paths: {
            "/category": {
            },
            "/room": {
            },
            "/word": {
            }
        },
        servers: [
            {
                url: "http://localhost:3000/api",
            },
        ],
    },
    apis: ["./controllers/*.ts"],
};


const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
