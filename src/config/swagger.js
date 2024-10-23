const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cinema Management API',
      version: '1.0.0',
      description: 'API documentation for the Cinema Management system', 
    },  
    servers: [
      {
        url: 'http://localhost:5000/api', 
      },
    ],
  },

  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

};
