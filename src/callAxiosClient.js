import { getResponse } from "./axios/baserowAxios";
import { deleteRecord } from './axios/baserowAxios';
import {deleteManyRecords} from './axios/baserowAxios';


export const callAxios = async (url, options = {}, operationName, idOrIdentificationName) => {
  console.log(url);
  if(operationName === 'GET_RECORDS'){
    let allRecords = [];
    const initialResponse = await getAllRecords(url);
    allRecords.push(initialResponse.json);
    allRecords = allRecords.flat();
  
    return {
      total: allRecords.length,
      json: allRecords,
    };
  }else if(operationName === 'GET_ONE'){
    console.log("hola");
  }else if(operationName === 'GET_MANY'){
    console.log(url);

    console.log("hola");
  }else if(operationName === 'GET_MANY_BY_REFERENCE'){
    console.log(url);
    console.log("hola");
  }else if(operationName === 'UPDATE_ONE_RECORD'){
    console.log("hola");
  }else if(operationName === 'UPDATE_MANY_RECORDS'){
    console.log("hola");
  }else if(operationName === 'CREATE_RECORD'){
    console.log("hola");
  }else if(operationName === 'DELETE_MANY_RECORDS'){
    const deleteResponse = await deleteManyRecords(url, idOrIdentificationName);
    let allRecords = [];
    const initialResponse = await getAllRecords(url);
    allRecords.push(initialResponse.json);
    allRecords = allRecords.flat();

    return {
      json: allRecords
    };
  }else if(operationName === 'GET_FIELDS'){
    //return getFieldIdOfTable(url, idOrIdentificationName);
  }
  else {
    console.log("hola");
  }
};

const getAllRecords = (url) =>  getResponse(url).then((resp) => {
  return {
    body: resp.body,
    headers: resp.headers,
    json: resp.json,
    total: resp.total,
  };
});
