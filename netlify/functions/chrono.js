exports.handler = async (event, context) => {
    const { queryStringParameters } = event;
    const { url } = queryStringParameters;
  
    if (!url || !url.startsWith('https://www.chronogolf.com')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid or missing URL" })
      };
    }
  
    try {
      const fetch = (await import('node-fetch')).default;
      const res = await fetch(url);
      const data = await res.json();
  
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: err.message })
      };
    }
  };
  