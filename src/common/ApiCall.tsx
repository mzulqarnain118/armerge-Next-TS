
import axios, { AxiosResponse, AxiosError } from 'axios';
import React, { useState, useEffect } from 'react';

// ** Common Components Import
import Toast from 'src/common/Toast/Toast';

interface ErrorData {
  code: number;
  message: string;
}
interface ErrorResponse {
  info?: any;
  code?: number;
  message?: string;
}

const getError = (error: AxiosError) => {
  if (error.response) {
    interface ApiResponse {
      code?: number;
      message?: string;
    }
    
    interface ErrorResponse {
      response?: {
        data?: ApiResponse;
      };
    }
    
    // Usage
    let status: number | undefined = (error as ErrorResponse)?.response?.data?.code;
    let message: string = (error as ErrorResponse)?.response?.data?.message ?? '';
    

    if (status === 401) {
      Toast(message, 'error');
      if (localStorage.getItem('loggedIn')==="true") {
        Toast("Session has expired!", "error");
        localStorage.setItem('loggedIn',"false");
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.assign('/auth/login');
      }
    } else if (status === 403) {
      Toast('This Role is restricted to access this request.', 'error');
    } else if (status === 500) {
      Toast('Internal Server Error', 'error');
    } else if (status === 422) {
      Toast('Cannot Process. Please Try Again', 'error');
    } else if (status === 405) {
      Toast('Not Found', 'error');
    } else if (status === 406) {
      Toast('Already Exist', 'error');
    } else if (status === 404) {
      Toast('API Not Found', 'error');
    } else if (status === 444) {
      Toast('Invalid Data', 'error');
    } else if (status === 430) {
      Toast(String(error.response.data), 'error'); // Explicitly cast to string
    } else {
      Toast(message, 'error');
    }
  } else {
    Toast('No Internet Connection', 'error');
  }
};

const csrf_token = 'jaf?lsajf#alskjf%aljdkf?klasf';
const baseUrl = 'http://localhost:4000/api/v1/public/'
// const baseUrl = 'http://54.254.210.6/api/v1/public/'
const token=""
const headers ={
  'Content-Type': 'application/json',
}

const fileHeaders = { 'csrf_token': csrf_token };
const options:any = { headers };
console.log(process.env.LIVE , "process.env.LIVE")
const getResponse = (response:any, redirect:boolean) => {

  if (response.status === 202 && redirect === true) {
    window.location.replace(response.data);
  } else {
    return response;
  }

}

const ApiCallPost = (path:any, data:any, redirect = true) => {
  return axios.post(baseUrl + path, data, options)
    .then((response) => {
      return getResponse(response, redirect);
    })
    .catch((error) => {
      return getError(error);
    });

}

const ApiCallDelete = (path:any, data:any,redirect = true) => {
  return axios.delete(baseUrl + path, options)
    .then((response) => {
      console.log('%cResponse: ','background: red; color: white; font-size: 20px;', response);
     
      return response;
    })
    .catch((error) => {
      console.log(' %o\n%cError: ','background: red; color: white; font-size: 20px;', error);
     
      return getError(error);
    });

}

const ApiCallPatch = (path:any, data:any, redirect = true) => {
  console.log(`%cdata=${data},path=${path}`, 'background: blue; color: white; font-size: 20px;margin: 30px;');
 
  return axios.patch(baseUrl + path, data, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return getError(error);
    });

}

const ApiCallPut = (path:any, data:any, redirect = true) => {
  console.log(`%cdata=${data},path=${path}`, 'background: blue; color: white; font-size: 20px;margin: 30px;');
 
  return axios.put(baseUrl + path, data, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return getError(error);
    });

}


const ApiCallGet = (path:any,payload:any, redirect = true) => {

  
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = () => {
    setLoading(true);

    return axios.get(baseUrl + path, options).then(res => setResponse(res.data))
      .catch((error) => {
        setError({ info: error?.response?.data, code: error?.response?.data?.code, message: error?.response?.data?.message } as ErrorResponse);
        getError(error)
      }).finally(() => setLoading(false));
  }


  useEffect(() => {
    fetchData();
  }, [path, payload?.getUpdatedData]);
  console.log('%cResponse: %o\n%cError:  %o\n%cpayload: ',
    'background: red; color: white; font-size: 20px;', response,
    'background: red; color: white; font-size: 20px;', error);

  return { response, error, loading };
};

const ApiCallGetSimple = (path:any, redirect = true) => {

  return axios.get(baseUrl + path, options)
    .then((response) => {
      return getResponse(response, redirect);
    })
    .catch((error) => {
      return getError(error);
    });

}
export { ApiCallGet, ApiCallGetSimple, ApiCallPost, ApiCallPatch, ApiCallDelete, ApiCallPut };
