const { sendResponse } = require('../../responses/index.js');
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
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
