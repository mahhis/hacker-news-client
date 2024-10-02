import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const getTopStories = async () => {
  const response = await axios.get(`${BASE_URL}/topstories.json`);
  return response.data;
};

export const getNewStories = async () => {
  const response = await axios.get(`${BASE_URL}/newstories.json`);
  return response.data;
};

export const getBestStories = async () => {
  const response = await axios.get(`${BASE_URL}/beststories.json`);
  return response.data;
};

export const getAskStories = async () => {
  const response = await axios.get(`${BASE_URL}/askstories.json`);
  return response.data;
};

export const getShowStories = async () => {
  const response = await axios.get(`${BASE_URL}/showstories.json`);
  return response.data;
};

export const getJobStories = async () => {
  const response = await axios.get(`${BASE_URL}/jobstories.json`);
  return response.data;
};

export const getStory = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/item/${id}.json`);
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/user/${id}.json`);
  return response.data;
};

export const getItemsByTopic = async (topic: string) => {
  const topicMap: { [key: string]: () => Promise<any> } = {
    top: getTopStories,
    new: getNewStories,
    best: getBestStories,
    ask:  getAskStories,
    job: getJobStories,
    show: getShowStories,
  };

  const fetchFunction = topicMap[topic.toLowerCase()];
  if (fetchFunction) {
    return await fetchFunction();
  } else {
    throw new Error('Invalid topic');
  }
};
