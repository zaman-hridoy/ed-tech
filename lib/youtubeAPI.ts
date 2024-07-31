import axios from "axios";

export default axios.create({
  baseURL: `${process.env.YOUTUBE_BASE_API}`,
  params: {
    part: "snippet",
    maxResults: 50,
    regionCode: "US",
    relevanceLanguage: "en",
    // publishedAfter: "2010-01-01T00:00:00Z",
    key: `${process.env.YOUTUBE_API_KEY}`,
  },
});
