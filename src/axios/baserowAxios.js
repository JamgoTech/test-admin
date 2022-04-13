import axios from "axios";
import{ HttpError } from 'react-admin';

export const getResponse = (url) => {
    const queryParams = `/?user_field_names=true`;
    const newUrl = url + queryParams;
    console.log(newUrl)
    return axios({
        method: "GET",
        url: newUrl,
        headers: {
          Authorization: "Token CIGFBxviZqwUlt6dkrSi8zch3V136wH5"
        }
      })
        .then(response =>{
            console.log(response)
            return {
                status: response.status,
                statusText: 'some error has happened',
                headers: response.headers,
                body: response.data.results,
                total: response.data.results.length,
            }
		})
        .then(({ status, statusText, headers, body, total }) => {
            let json;
            try {
                json = body;
            } catch (e) {
                console.log(e);
            }
            if (status < 200 || status >= 300) {
                return Promise.reject(
                    new HttpError(
                        (json && json.message) || statusText,
                        status,
                        json
                    )
                );
            }
            return Promise.resolve({ status, headers, body, json, total});
        });
};

export const deleteManyRecords  = (url, id) => {
    console.log(url)
    const queryParams = `/${id}/`;
    const newUrl = url + queryParams;
    console.log(newUrl)
	return axios({
        method: "DELETE",
        url: newUrl,
        headers: {
          Authorization: "Token CIGFBxviZqwUlt6dkrSi8zch3V136wH5"
        }
      }).then(response =>{
            console.log(response)
            if(response.status === 204){
                return Promise.resolve("HOLAAA");
            }
		})
        .catch((error) => {
            //throw error("lsThere was and error while trying to delete the record with an error: ")
            return Promise.reject("There was an error: " + error);
        });
};


export const getOneRecord = (url, id) => {
    const pathVariable = `/${id}/?user_field_names=true`;
    const newUrl = url + pathVariable;
    return axios({
        method: "GET",
        url: newUrl,
        headers: {
          Authorization: "Token CIGFBxviZqwUlt6dkrSi8zch3V136wH5"
        }
      }).then(response =>{
            if(response.status === 200){
                const transformedResponse = {
                    id: response.data.id,
                    fields: response.data.fields
                }
                return Promise.resolve(transformedResponse);
            }
		})
        .catch((error) => {
            throw error("There was and error while trying to get the record with id: " + id +" And an error: " + error)
            return Promise.reject("There was an error: " + error);
        });
};

export const getManyRecordsByIds = (records, ids) => {
    return records.map((record) => record.id)
    .filter(id1 => ids.indexOf(id1) !== -1);
};

export const createRecords = (url, createRecordsBody) => {

	const options = {
		headers: {'Authorization': 'Bearer keyR6luhfOMWqiXDz'}
	};
    return axios.post(url, createRecordsBody, options)
        .then(response =>{
            if(response.status === 200){
                return Promise.resolve(response.data);
            }
		})
        .catch((error) => {
            throw error("There was and error while trying to create records")
            return Promise.reject("There was an error: " + error);
        });
};

export const updateOneRecord = (url, updateRecordsBody) => {

	const options = {
		headers: {'Authorization': 'Bearer keyR6luhfOMWqiXDz'}
	};
    return axios.patch(url, updateRecordsBody, options)
        .then(response =>{
            if(response.status === 200){
                return Promise.resolve(response.data);
            }
		})
        .catch((error) => {
            //throw error("There was and error while trying to get the record with id: " + id +" And an error: " + error)
            return Promise.reject("There was an error: " + error);
        });
};

export const getFieldIdOfTable = (url, fieldName) => {

    return axios({
        method: "GET",
        url: url,
        headers: {
          Authorization: "Token CIGFBxviZqwUlt6dkrSi8zch3V136wH5"
        }
      }).then(response => {
          return response.data.filter(field => field.name == fieldName)[0].id;
      })
        .catch((error) => {
            throw error("There was and error while trying to get the field id of a matching field: " + fieldName +" And an error: " + error)
            return Promise.reject("There was an error: " + error);
        });
};
