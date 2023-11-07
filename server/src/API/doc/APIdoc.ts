// ./api-v1/api-doc.js
import { OpenAPIV3 } from 'openapi-types'


const apiDoc: OpenAPIV3.Document = {
  openapi: '3.0.3',
  servers: [{
    url: 'http://localhost:3000/v1',
    description: 'local API'
  }],
  info: {
    title: 'A getting started API.',
    version: '1.0.0'
  },
  components: {
    responses: {
      Error: {
        description: "apiDoc can't be initialized",
        content: {
          'text/plain': {
              schema: {
                  type: 'string',
              }
          }
        }
      },
      Successful: {
        description: "It works",
        content: {
          'text/plain': {
            schema: {
              type: 'string',
            }
          }
        }
      },
    },
    schemas: {
      World: {
        type: 'object',
        properties: {
          name: {
            description: 'The name of this world.',
            type: 'string'
          }
        },
        required: ['name']
      }
    }
  },
  paths: {}
};
 
export default apiDoc;