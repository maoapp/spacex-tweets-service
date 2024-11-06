import axios from 'axios';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';

dotenv.config();

// Initialize cache with 30-minute expiration
const cache = new NodeCache({ stdTTL: 1800, checkperiod: 600 });

const TWITTER_API_URL = `${process.env.TWITTER_API_URL}/2/tweets/search/recent`;
const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN || '';

/**
 * Fetches recent tweets based on the provided query with caching to handle rate limits.
 * @param query - The search query for tweets (e.g., "spacex").
 * @param maxResults - The maximum number of results to fetch (default: 10).
 * @returns The cached or API response data from the Twitter API.
 */
export const fetchRecentTweets = async (query: string, maxResults: number = 10) => {
  const cacheKey = `${query}-${maxResults}`;

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(TWITTER_API_URL, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      params: {
        query,
        max_results: maxResults,
        'tweet.fields': 'created_at,text,author_id',
      },
    });

    // Cache the successful response with a TTL of 30 minutes
    cache.set(cacheKey, response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response } = error;
      const errorMessage = response
        ? `Axios error: ${response.status} - ${response.statusText}. ${JSON.stringify(response.data)}`
        : error.message;

      throw new Error(
        response
          ? `Twitter API error: ${response.status} - ${response.data.title || response.statusText}`
          : 'An unknown Axios error occurred'
      );
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error occurred while fetching tweets.');
    }
  }
};
