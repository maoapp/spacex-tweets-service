export const mockTwitterResponse = {
  data: [
    {
      id: '1854285336773292186',
      edit_history_tweet_ids: ['1854285336773292186'],
      text: "RT @cb_doge: I still don't know how to stop watching this. https://t.co/IHUqW85HfG",
    },
    {
      id: '1854285334110200008',
      edit_history_tweet_ids: ['1854285334110200008'],
      text: "RT @SpaceX: Starship’s fifth flight test was a seminal moment in iterating towards a fully and rapidly reusable launch system. Next up: t…",
    },
    // Add other tweets as needed...
  ],
  meta: {
    newest_id: '1854285336773292186',
    oldest_id: '1854285279475232992',
    result_count: 10,
    next_token: 'b26v89c19zqg8o3frr0ss6ou708baxrezqluemeq3tw1p',
  },
};

export const mockTwitterErrorResponse = {
  response: {
    status: 429,
    statusText: 'Too Many Requests',
    data: { title: 'Rate limit exceeded' },
  },
};
