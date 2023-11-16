import { Operation } from 'express-openapi';
import cors from 'cors';
import * as fs from 'fs';

// Appends to test.txt

function postObjToFile(test: string) {
  const filePath = 'test.txt';
  console.log('start post file');
  fs.open(filePath, 'a', (openError, fd) => {
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

export const POST: Operation = [
  cors(),
  (req, res) => {
    const body = req.body;
    const JSONstring = JSON.stringify(body, null, 2);
    postObjToFile(JSONstring);
    res.status(200).send(body);
  },
];

POST.apiDoc = {
  description: 'create something new in swagger',
  requestBody: {
    description: 'Send something',
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
