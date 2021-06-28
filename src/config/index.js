const config = {
  apiURL: process.env.REACT_APP_API_URL,
  jitsi: {
    appId: process.env.REACT_APP_JITSI_APP_ID,
  },
  pusher: {
    key: process.env.REACT_APP_CORS_PUSHER_KEY,
    cluster: process.env.REACT_APP_CORS_PUSHER_CLUSTER,
  },
};

export default config;
