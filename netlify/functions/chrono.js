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

    const res = await fetch(url, {
      // Add browser-like headers here
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.chronogolf.com/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site'
      }
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error('Upstream API error:', res.status, res.statusText, 'Body:', errorBody);
      return {
        statusCode: res.status,
        body: JSON.stringify({
          error: "Upstream API error",
          status: res.status,
          statusText: res.statusText,
          details: errorBody
        })
      };
    }

    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.error('Netlify function failed:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Netlify function error", details: err.message })
    };
  }
};