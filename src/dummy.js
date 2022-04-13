import axios from "axios";
import{ HttpError } from 'react-admin';
import {ConcurrencyManager} from "axios-concurrency";

const apiKey = "CIGFBxviZqwUlt6dkrSi8zch3V136wH5";    // switch to environment variable in production 

//const baseURL = "https://api.baserow.io/api/database/rows/table/";

function errorHandler(error) {                        // handles the error in the catch
    if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
  } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
  } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
  }
  console.log(error.config);
}

//const axios = require("axios");

const baserowClient = axios.create({                             // creates the baserow API client
    baseURL: 'https://api.baserow.io/api/database/rows/table/',
    timeout: 3000,
    headers: {Authorization: "Token "+apiKey},
  });

//const { ConcurrencyManager } = require("axios-concurrency");
const MAX_CONCURRENT_REQUESTS = 20;
const manager = ConcurrencyManager(baserowClient, MAX_CONCURRENT_REQUESTS);

export const dataProvider = {
    getList: (resource,params) => baserowClient.get(resource+'/?user_field_names=true').then(response =>{
        return {
            status: response.status,
            headers: response.headers,
            data: response.data.results,
            total: response.data.results.length,
        }
    }).catch(error => errorHandler(error)),
    getOne: (resource,params) => baserowClient.get(resource+'/'+params.id+'/?user_field_names=true').then(response =>{
            return {
                status: response.status,
                headers: response.headers,
                data: response.data,
            }
        }).catch(error => errorHandler(error)),
    getMany: (resource,params) => {
        let rows = params.ids;

        Promise.all(rows.map(row => baserowClient.get(resource+'/'+row+'/?user_field_names=true'))).then(responses =>{
            return {
                data: responses.map(response => response.data),
            }
        });
    },
/*     getManyReference: (resource,params) => {  // precondition: target="id"
        
        .`params.target`
    

        baserowClient.get(resource+'/?user_field_names=true').then(response =>{
            return {
                status: response.status,
                headers: response.headers,
                data: response.data.results,
                total: response.data.results.length,
            }
        }).catch(error => errorHandler(error)),
    }, */
    create: (resource,params) => baserowClient.post(resource+'/?user_field_names=true', params.data).then(response =>{
            return {
                status: response.status,
                headers: response.headers,
                data: response.data,
            }
        }).catch(error => errorHandler(error)),   
    update: (resource,params) => baserowClient.patch(resource+'/'+params.id+'/?user_field_names=true', params.data).then(response =>{
            return {
                status: response.status,
                headers: response.headers,
                data: response.data,
            }
        }).catch(error => errorHandler(error)),   
    updateMany: (resource,params) =>  {       
        let rows = params.ids;
        
        Promise.all(rows.map(row => baserowClient.patch(resource+'/'+row+'/?user_field_names=true', params.data).then(responses =>{
            return {
                data: responses.map(response => response.data),
            }
        })
        ));     
    },
    delete: (resource,params) => baserowClient.delete(resource+'/'+params.id+'/').then(response =>{
        return {
            status: response.status,
            headers: response.headers,
            data: response.data,
        }
    }).catch(error => errorHandler(error)), 
    deleteMany: (resource,params) => {
        let rows = params.ids;

        Promise.all(rows.map(row => baserowClient.delete(resource+'/'+row+'/'))).then(responses =>{
            return {
                data: responses.map(response => response.data),
            }
        });
    },
}
/*     {
        let rows = params.ids;
        let reqs = [];
        for (let row of rows) {
            reqs.push(baserowClient.get(resource+'/'+row));
        }
        Promise.all(reqs).then(resps => {
            for (let resp of resps) {
                console.log(resp.status);
            }}).catch(error => errorHandler(error));
        },     
    } */
  //      axios.all(rows.map((row) => baserowClient.get(resource+"/"+row).then(response =>{
  //          return {
  //              status: response.status,
  //              headers: response.headers,
  //              data: response.data,
 //           }
//      })



/* 

export const dataProvider = {
    getList: (resource,params) => axios({
        url: resource,
        method: "get",
        baseURL: baseURL,
		headers: {
			        Authorization: "Token "+apiKey
		    },
        params: {user_field_names: true},
        })
        .then(response =>{
            return {
                status: response.status,
                headers: response.headers,
                data: response.data.results,
                total: response.data.results.length,
            }
		})
        .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          }),
    getOne: (resource,params) => axios({
        url: resource+"/"+params.id,
        method: "get",
        baseURL: baseURL,
        headers: {
                    Authorization: "Token "+apiKey
            },
        params: {user_field_names: true},
        })
        .then(response =>{
            return {
                status: response.status,
                headers: response.headers,
                data: response.data,
            }
        })
        .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
            }),
    getMany: (resource,params) => {
        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
            (data) => console.log(data),
          ); 
    }
    
        axios({
        url: resource+"/"+params.id,
        method: "get",
        baseURL: baseURL,
        headers: {
                    Authorization: "Token "+apiKey
             },
        params: {user_field_names: true},
        })
        .then(response =>{
            return {
                status: response.status,
                headers: response.headers,
                data: response.data,
            }
        })
        .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }),
};
 */

//};