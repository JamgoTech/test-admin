import axios from "axios";
import { error } from "console";
import{ HttpError } from 'react-admin';

export const getAllRecords = (url) => {
	console.log(url)
	const options = {
		headers: {'Authorization': 'Token WpCINI6OGVXmv0rIYya4RHyqNe4t0eel'}
	};
    return axios.get(url, options)
        .then(response =>{
            console.log(response)
            return {
                status: response.status,
                statusText: 'some error has happened',
                headers: response.headers,
                body: response.data.records.map(rec => {
                    console.log(rec)
                    return {
                        Name: rec.Name,
                        Category:rec.fields.Category,
                        Completed:rec.fileds.Completed,
                        Client: rec.fields.Client,
                        ProjectLead: rec.fields.ProjectLead,
                        ProjectTeam	: rec.fields.ProjectTeam,
                        KickoffDate: rec.fields.KickoffDate,
                        DueDate: rec.fields.DueDate,
                        Notes: rec.fileds.Notes,
                        Tasks: rec.fileds.Tasks
                    }}),
                total: response.data.records.length,
                offset: response.data.offset
            }
		})
        .then(({ status, statusText, headers, body, total, offset }) => {
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
            return Promise.resolve({ status, headers, body, json, total, offset });
        });
};

export const deleteRecord = (url, id) => {
    const queryParams = `?records[]=${id}`;
    const newUrl = url + queryParams;
	const options = {
		headers: {'Authorization': 'Token WpCINI6OGVXmv0rIYya4RHyqNe4t0eel'}
	};
    return axios.delete(newUrl, options)
        .then(response =>{
            if(response.status === 200){
                return Promise.resolve(response);
            }
		})
        .error((error) => {
            throw error("There was and error while trying to delete the record with id: " + response.data.records.id +" And an error: " +error)
            return Promise.reject("There was an error: " + error);
        });
};

export const deleteManyRecords = (url, ids) => {
    const paramsAsStrings = '?'
    ids.forEach(id => {
        paramsAsStrings += `records[]=${id}&`
    });
    const newUrl = url + paramsAsStrings;
	const options = {
		headers: {'Authorization': 'Token WpCINI6OGVXmv0rIYya4RHyqNe4t0eel'}
	};
    return axios.delete(newUrl, options)
        .then(response =>{
            if(response.status === 200){
                return Promise.resolve(response);
            }
		})
        .error((error) => {
            throw error("There was and error while trying to delete multiple records:" + error)
            return Promise.reject("There was an error: " + error);
        });
};

export const getOneRecord = (url, id) => {
    const pathVariable = `/${id}`;
    const newUrl = url + pathVariable;
	const options = {
		headers: {'Authorization': 'Token WpCINI6OGVXmv0rIYya4RHyqNe4t0eel'}
	};
    return axios.get(newUrl, options)
        .then(response =>{
            if(response.status === 200){
                const transformedResponse = {
                    id: response.data.id,
                    fields: response.data.fields
                }
                return Promise.resolve(transformedResponse);
            }
		})
        .error((error) => {
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
		headers: {'Authorization': 'Token WpCINI6OGVXmv0rIYya4RHyqNe4t0eel'}
	};
    return axios.post(url, createRecordsBody, options)
        .then(response =>{
            if(response.status === 200){
                return Promise.resolve(response.data);
            }
		})
        .error((error) => {
            throw error("There was and error while trying to create records")
            return Promise.reject("There was an error: " + error);
        });
};

export const updateOneRecord = (url, updateRecordsBody) => {

	const options = {
		headers: {'Authorization': 'Token WpCINI6OGVXmv0rIYya4RHyqNe4t0eel'}
	};
    return axios.patch(url, updateRecordsBody, options)
        .then(response =>{
            if(response.status === 200){
                return Promise.resolve(response.data);
            }
		})
        .error((error) => {
            throw error("There was and error while trying to get the record with id: " + id +" And an error: " + error)
            return Promise.reject("There was an error: " + error);
        });
};
