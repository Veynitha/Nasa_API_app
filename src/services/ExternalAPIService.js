import axios from "axios";

const dailyUrl = process.env.REACT_APP_DAILY_API;
const roverUrl = process.env.REACT_APP_ROVER_API;
const manifestUrl = process.env.REACT_APP_MANIFEST_API;

export const getDailyPictureData = async (data) => {
  try {
    const { date } = data;
    const requestUrl = `${dailyUrl}?api_key=${process.env.REACT_APP_API_KEY}&date=${date}`;
    const response = await axios.get(requestUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getRoverPictureData = async (data) => {
  try {
    const { sol, page, camera, rover } = data;
    let requestUrl = "";
    if (camera === "") {
      requestUrl = `${roverUrl}/${rover}/photos?api_key=${process.env.REACT_APP_API_KEY}&sol=${sol}&page=${page}`;
    } else {
      requestUrl = `${roverUrl}/${rover}/photos?api_key=${process.env.REACT_APP_API_KEY}&sol=${sol}&page=${page}&camera=${camera}`;
    }
    const response = await axios.get(requestUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getRoverManifest = async (rover) => {
  try {
    const requestUrl = `${manifestUrl}/${rover}?api_key=${process.env.REACT_APP_API_KEY}`;
    const response = await axios.get(requestUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
