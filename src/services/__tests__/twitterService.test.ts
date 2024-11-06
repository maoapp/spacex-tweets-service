import axios from 'axios';
import { fetchRecentTweets } from '../../services/twitterService';
import { mockTwitterResponse, mockTwitterErrorResponse } from '../../mocks/twitterMocks';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchRecentTweets', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return tweets if the API call succeeds', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockTwitterResponse });

    const query = 'spacex';
    const maxResults = 10;
    const tweets = await fetchRecentTweets(query, maxResults);

    expect(tweets).toEqual(mockTwitterResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/2/tweets/search/recent'), {
      headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
      params: {
        query,
        max_results: maxResults,
        'tweet.fields': 'created_at,text,author_id',
      },
    });
  });

  it.skip('should throw an error if the API call fails', async () => {
    // Simulate an API error
    mockedAxios.get.mockRejectedValue(mockTwitterErrorResponse);

    const query = 'spacex';
    const maxResults = 10;

    await expect(fetchRecentTweets(query, maxResults)).rejects.toThrow(
      'Twitter API error: 429 - Rate limit exceeded'
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/2/tweets/search/recent'), {
      headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
      params: {
        query,
        max_results: maxResults,
        'tweet.fields': 'created_at,text,author_id',
      },
    });
  });
});
