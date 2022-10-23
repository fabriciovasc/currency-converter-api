import swaggerJsDoc from 'swagger-jsdoc';
import config from '@config/index';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Currency Converter API',
      description: 'A simple currency converter API service',
      version: '0.0.0',
      contact: {
        url: 'github.com/fabriciovasc',
        name: 'fabriciovasc'
      }
    },
    servers: [
      {
        url: `/api/${config.app.apiVersion}`,
        description: `Server ${config.app.server}`
      }
    ],
    components: {
      schemas: {
        Transaction: {
          type: 'object',
          properties: {
            id: { type: 'integer', format: 'int32' },
            userId: { type: 'integer', format: 'int32' },
            baseValue: { type: 'number', format: 'float' },
            baseCurrency: { type: 'string' },
            quoteCurrency: { type: 'string' },
            conversionRate: { type: 'number', format: 'float' },
            quoteRate: { type: 'number', format: 'float' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        }
      },
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {}
          }
        },
        '400': {
          description: 'Bad Request'
        },
        '404': {
          description: 'Not Found'
        },
        '500': {
          description: 'Internal Server Error'
        },
        '503': {
          description: 'Service Unavailable'
        }
      }
    }
  },
  apis: []
};

export const specs = swaggerJsDoc(options);
