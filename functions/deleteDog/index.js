const { sendResponse } = require('../../responses/index.js');
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  const { dogId } = event.pathParameters;

  try {
    await db
      .delete({
        TableName: 'dog-db',
        Key: { id: dogId },
      })
      .promise();

    return sendResponse(200, { success: true });
  } catch (error) {
    return sendResponse(500, { success: false, message: 'could not delete' });
  }
};
