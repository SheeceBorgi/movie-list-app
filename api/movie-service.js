import axios from "axios";

export const discoverMoviesService = ({ params, data, url, apiKey }) => {
  try {
    return axios({
      url,
      headers: {
        Accept: "application/json",
      },
      method: "GET",
      params,
      data,
    });
  } catch (error) {
    throw error;
  }
};

export const searchMoviesService = ({ params, data, url }) => {
  try {
    return axios({
      url,
      headers: {
        Accept: "application/json",
      },
      method: "GET",
      params,
      data,
    });
  } catch (error) {
    throw error;
  }
};
