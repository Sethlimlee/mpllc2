const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.handler = async (event, context) => {
  const { queryStringParameters } = event;
  const { url } = queryStringParameters;

  if (!url || !url.startsWith('https://www.foreupsoftware.com')) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid or missing URL" }),
    };
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
