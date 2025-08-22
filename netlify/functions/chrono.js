const { ApifyClient } = require('apify-client');

exports.handler = async (event, context) => {
  const { queryStringParameters } = event;
  const { url } = queryStringParameters;
  

  console.log('API Token Value:', process.env.APIFY_API_TOKEN);
  // Replace with your actual Apify API token and Task ID
  const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN;
  const CHRONOGOLF_TASK_ID = 'NiJvcWHVOkWBWNser'; 

  // Initialize the ApifyClient with your API token
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
    // Run the Apify task with a dynamic start URL
    const run = await apifyClient.task(CHRONOGOLF_TASK_ID).call({
      // The startUrls is now a dynamic value based on the URL parameter
      startUrls: [{ url: url }],
      useSession: true,
      waitUntil: 'networkidle0',
    });

    // Get the dataset from the run and list the items
    const dataset = await apifyClient.dataset(run.defaultDatasetId).listItems();

    if (dataset.items && dataset.items.length > 0) {
      // Return the first item from the dataset, assuming it's the JSON data
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