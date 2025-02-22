
import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://lms-system-red.vercel.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.response.use(

  async (response) => {
    const token = null
    if(token){

      response.headers.Authorization = `Bearer ${token}`;
    }
    return response
  }, // Successful response
  (error) => {
    console.log(error.response.data)
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message
      throw new Error(errorMessage);
    }else {
      const errorMessage  = error.response.data
      console.log(errorMessage)
      // throw new Error(errorMessage);
    }
  }
);

export default axiosInstance;

