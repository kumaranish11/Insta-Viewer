// netlify/functions/proxy.js
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const { endpoint, username } = event.queryStringParameters;

  if (!username || !endpoint) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Missing username or endpoint' }),
    };
  }

  try {
    const apiUrl = `https://newinstainfoapi.anshppt19.workers.dev/${endpoint}?username=${username}`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.text();

    return {
      statusCode: 200,
      headers,
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
