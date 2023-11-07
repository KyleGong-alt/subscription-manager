import { Operation } from 'express-openapi';
import cors from 'cors';

export const GET: Operation = [ // Operations expects an array of middleware and a request handler
  cors(), // Middleware
  (badreq, res) => { // request handler (request, response)
      const req = badreq as typeof badreq & { apiDoc: object }; // Converts request(badreq) to have badreq type and apiDoc type into new const var req
      res.status(200).json(req.apiDoc); // Needed so req has the apiDoc property 
  }
];

// Includes API documentation with request object, accessed by route handler
GET.apiDoc = {
  description: "retrieve from swagger",
  responses: {
    200: {
      description: "You can connect to YAMLMALML Wow",
      content: {
        'application/json': {
          schema: {
            type : 'object'
          }
        } 
      }
    },
    default: {
      $ref: '#/components/responses/Error'
    }
  }
}


