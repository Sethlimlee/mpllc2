const { ApifyClient } = require('apify-client');

exports.handler = async (event, context) => {
  const { queryStringParameters } = event;
  const { url } = queryStringParameters;
  
  const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN;
  const CHRONOGOLF_TASK_ID = 'NiJvcWHVOkWBWNser'; 

  const apifyClient = new ApifyClient({
    token: APIFY_API_TOKEN,
  });

  if (!url || !url.startsWith('https://www.chronogolf.com')) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid or missing URL" })
    };
  }

  try {
    const run = await apifyClient.task(CHRONOGOLF_TASK_ID).call({
      startUrls: [{ url: url }],
      useSession: true,
      // CORRECTED LINE: waitUntil now in an array
      waitUntil: ['networkidle0'],
    });

    const dataset = await apifyClient.dataset(run.defaultDatasetId).listItems();

    if (dataset.items && dataset.items.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify(dataset.items[0]),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "No data found for this URL" }),
      };
    }

  } catch (err) {
    console.error('Apify run failed:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Apify integration failed", details: err.message }),
    };
  }
};