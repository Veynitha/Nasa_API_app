import axios from 'axios';
import { getDailyPictureData, getRoverPictureData, getRoverManifest } from '../ExternalAPIService';

jest.mock('axios');

describe('ExternalAPIService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getDailyPictureData', () => {
    it('should make a GET request to daily API endpoint with provided date and return response data', async () => {
      const mockData = { date: '2024-05-10' };
      const mockResponseData = { url: 'image-url', title: 'Image Title', explanation: 'Image Explanation' };
      axios.get.mockResolvedValueOnce({ data: mockResponseData });

      const result = await getDailyPictureData(mockData);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_DAILY_API}?api_key=${process.env.REACT_APP_API_KEY}&date=${mockData.date}`
      );
      expect(result).toEqual(mockResponseData);
    });

    it('should return null if request fails', async () => {
      const mockData = { date: '2024-05-10' };
      const mockError = new Error('Failed to fetch daily picture data');
      axios.get.mockRejectedValueOnce(mockError);

      const result = await getDailyPictureData(mockData);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_DAILY_API}?api_key=${process.env.REACT_APP_API_KEY}&date=${mockData.date}`
      );
      expect(result).toBeNull();
    });
  });

  describe('getRoverPictureData', () => {
    it('should make a GET request to rover API endpoint with provided parameters and return response data', async () => {
      const mockData = { sol: 1000, page: 1, camera: 'FHAZ', rover: 'curiosity' };
      const mockResponseData = { photos: [{ id: 1, img_src: 'image-url' }] };
      axios.get.mockResolvedValueOnce({ data: mockResponseData });

      const result = await getRoverPictureData(mockData);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_ROVER_API}/curiosity/photos?api_key=${process.env.REACT_APP_API_KEY}&sol=1000&page=1&camera=FHAZ`
      );
      expect(result).toEqual(mockResponseData);
    });

    it('should make a GET request without camera parameter if camera is empty', async () => {
      const mockData = { sol: 1000, page: 1, camera: '', rover: 'curiosity' };
      const mockResponseData = { photos: [{ id: 1, img_src: 'image-url' }] };
      axios.get.mockResolvedValueOnce({ data: mockResponseData });

      const result = await getRoverPictureData(mockData);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_ROVER_API}/curiosity/photos?api_key=${process.env.REACT_APP_API_KEY}&sol=1000&page=1`
      );
      expect(result).toEqual(mockResponseData);
    });

    it('should return null if request fails', async () => {
      const mockData = { sol: 1000, page: 1, camera: 'FHAZ', rover: 'curiosity' };
      const mockError = new Error('Failed to fetch rover picture data');
      axios.get.mockRejectedValueOnce(mockError);

      const result = await getRoverPictureData(mockData);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_ROVER_API}/curiosity/photos?api_key=${process.env.REACT_APP_API_KEY}&sol=1000&page=1&camera=FHAZ`
      );
      expect(result).toBeNull();
    });
  });

  describe('getRoverManifest', () => {
    it('should make a GET request to rover manifest API endpoint with provided rover name and return response data', async () => {
      const mockResponseData = { name: 'Curiosity', landing_date: '2012-08-06' };
      axios.get.mockResolvedValueOnce({ data: mockResponseData });

      const result = await getRoverManifest('curiosity');

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_MANIFEST_API}/curiosity?api_key=${process.env.REACT_APP_API_KEY}`
      );
      expect(result).toEqual(mockResponseData);
    });

    it('should return null if request fails', async () => {
      const mockError = new Error('Failed to fetch rover manifest');
      axios.get.mockRejectedValueOnce(mockError);

      const result = await getRoverManifest('curiosity');

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_MANIFEST_API}/curiosity?api_key=${process.env.REACT_APP_API_KEY}`
      );
      expect(result).toBeNull();
    });
  });
});
