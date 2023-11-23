const { sendResponse } = require('../../responses/index.js');
const AWS = require('aws-sdk');
const middy = require('@middy/core');
//import middy from '@middy/core';
const { validateToken } = require('../middleware/auth');
const db = new AWS.DynamoDB.DocumentClient();

const getDogs = async (event, context) => {
  if (event?.error && event?.error === '401')
    return sendResponse(401, { success: false, message: 'invalid token' });

  console.log('Event:', event);

  const { Items } = await db
    .scan({
      TableName: 'dogs-db',
      FilterExpression: 'attribute_exists(#id)',
      ExpressionAttributeNames: {
        '#id': 'id',
      },
    })
    .promise();

  return sendResponse(200, { success: true, dogs: Items });
};
const handler = middy(getDogs).use(validateToken);

module.exports = { handler };
