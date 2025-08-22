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

    // IMPORTANT: Check the status code first
    if (!res.ok) {
      // If the response is not OK (e.g., 500), read the body as text
      const errorBody = await res.text();
      console.error('Upstream API error:', res.status, res.statusText, 'Body:', errorBody);

      // Return a detailed error response to your client
      return {
        statusCode: res.status,
        body: JSON.stringify({
          error: "Upstream API error",
          status: res.status,
          statusText: res.statusText,
          details: errorBody // Include the full HTML error page from Chronogolf
        })
      };
    }

    // Only proceed to parse as JSON if the response was successful
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    // This catch block handles network errors or unexpected parsing issues
    console.error('Netlify function failed:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Netlify function error", details: err.message })
    };
  }
};