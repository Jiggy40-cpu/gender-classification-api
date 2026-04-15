const axios = require('axios');

export default async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 'error',
      message: 'Method not allowed'
    });
  }

  const { name } = req.query;

  // Validation: Missing or empty name
  if (!name) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing or empty name parameter'
    });
  }

  // Validation: name must be string
  if (typeof name !== 'string') {
    return res.status(422).json({
      status: 'error',
      message: 'name is not a string'
    });
  }

  try {
    // Call Genderize API
    const response = await axios.get('https://api.genderize.io/', {
      params: { name },
      timeout: 5000
    });

    const { gender, probability, count } = response.data;

    // Edge case: null gender or count: 0
    if (gender === null || count === 0) {
      return res.status(200).json({
        status: 'error',
        message: 'No prediction available for the provided name'
      });
    }

    // Confidence logic: both conditions must pass
    const is_confident = probability >= 0.7 && count >= 100;

    // Generate processed_at timestamp (UTC, ISO 8601)
    const processed_at = new Date().toISOString();

    return res.status(200).json({
      status: 'success',
      data: {
        name: name.toLowerCase(),
        gender,
        probability,
        sample_size: count,
        is_confident,
        processed_at
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Unable to process request'
    });
  }
};