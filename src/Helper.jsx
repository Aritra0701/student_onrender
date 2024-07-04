import axios from "axios";

const adminUrl="https://webskitters-student.onrender.com"
export const baseURL=adminUrl;
const axiosInstance=axios.create({
    baseURL,
})
export {adminUrl}


export const product_pic=(media)=>{
  return `https://webskitters-student.onrender.com/user/${media}`
}
axiosInstance.interceptors.request.use(
    async function(config){
      const token = localStorage.getItem('token');
      if (token) {
        config.headers["x-access-token"]=token;
      }
      return config;
    },
    function(error){
      return Promise.reject(error);
    }
  );
  
  
  
  export default axiosInstance;