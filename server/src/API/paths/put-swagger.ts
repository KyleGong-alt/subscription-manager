import { Operation } from 'express-openapi';
import cors from 'cors';
import * as fs from 'fs';
import bcrypt from 'bcrypt';

// Overwrites test.txt with new JSON

function postObjToFile(test: string) {
  const filePath = 'test.txt';
  console.log('start post file');
  fs.open(filePath, 'w', (openError, fd) => {
    if (openError) {
      console.log('problem opening the file:', openError);
    } else {
      fs.write(fd, test, (writeError) => {
        if (writeError) {
          console.log('problem writing to file:', writeError);
        } else {
          console.log('Successfully written into');
        }
      });
    }
    fs.close(fd, (closeError) => {
      if (closeError) {
        console.log('error closing file:', closeError);
      } else {
        console.log('file closed');
      }
    });
  });
}

export const PUT: Operation = [
  // Operations expects an array of middleware and a request handler
  cors(), // Middleware
  (req, res) => {
    const body = req.body;
    const JSONstring = JSON.stringify(body, null, 2);
    postObjToFile(JSONstring);
    //hash and salted password test, probably not the best place to do it here, just tried for testing
    const JSONparsed = JSON.parse(JSONstring);
    bcrypt
      .hash(JSONparsed.password, 10)
      .then((hash) => {
        console.log('password', JSONparsed.password, '\nhashed password', hash);
      })
      .catch((error) => {
        console.log('Error hashing password:', error);
      });
    res.status(200).send(body);
  },
];

// Includes API documentation with request object, accessed by route handler
PUT.apiDoc = {
  description: 'Update something in swagger',
  requestBody: {
    description: 'Update something',
    content: {
      'application/json': {
        schema: {
          type: 'object',
        },
      },
    },
  },
  responses: {
    200: {
      $ref: '#/components/responses/Successful',
    },
    default: {
      $ref: '#/components/responses/Error',
    },
  },
};
