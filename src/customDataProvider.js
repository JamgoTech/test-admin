import { stringify } from 'query-string';
import axios from "axios";
import { deleteRecord } from './axios/baserowAxios';

export const customDataProvider = (
    apiUrl,
    httpClient,
    countHeader ='Content-Range'
) => ({
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const rangeStart = (page - 1) * perPage;
        const rangeEnd = page * perPage - 1;

        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([rangeStart, rangeEnd]),
        };
        const url = `${apiUrl}/${resource}`;
        const options =
            countHeader === 'Content-Range'
                ? {
                      // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
                      headers: new Headers({
                          Range: `${resource}=${rangeStart}-${rangeEnd}`,
                      }),
                  }
                : {};

        return httpClient(url, options, 'GET_RECORDS').then(({ headers, json, total }) => {

            //if (!headers.has(countHeader)) {
                //throw new Error(
                    //`The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`
                //);
            //}
            return {
                data: json,
                total: total
                   // countHeader === 'Content-Range'
                        //? parseInt(
                              //headers.get('content-range').split('/').pop(),
                              //10
                          //)
                        //: parseInt(headers.get(countHeader.toLowerCase())),
            };
        });
    },

    getOne: (resource, params) => {
        console.log("entro aqui")
        httpClient(`${apiUrl}/${resource}/${params.id}`, null, 'GET_ONE').then(({ json }) => ({
            data: json,
        }));
    },

    getMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
        // //&filter__field_335713__equal=aa100c6c-14e8-440d-a2c7-fdd38b8a7cd8
        // const fieldUrl = apiUrl.replace('rows', 'fields');
        // const fieldId = await httpClient(fieldUrl, null, 'GET_FIELDS');
        // const filtersQuery = "?user_field_names=true";
        // params.ids.foreach(id => filtersQuery += `&filter__field_${fieldId}__equal=${id.value}`);
        // filtersQuery += "&filter_type=OR";
        // const url = `${apiUrl}/${resource}${filtersQuery}`;
        // return httpClient(url, null, 'GET_MANY').then((data) => ({ data: data.json }));
    },

    getManyReference: (resource, params) => {
        console.log("entro aqui")
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const rangeStart = (page - 1) * perPage;
        const rangeEnd = page * perPage - 1;

        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}/${params.target}`;
        const options =
            countHeader === 'Content-Range'
                ? {
                      // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
                      headers: new Headers({
                          Range: `${resource}=${rangeStart}-${rangeEnd}`,
                      }),
                  }
                : {};

        return httpClient(url, options, 'GET_MANY_BY_REFERENCE').then(({ headers, json }) => {
            if (!headers.has(countHeader)) {
                throw new Error(
                    `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`
                );
            }
            return {
                data: json,
                total:
                    countHeader === 'Content-Range'
                        ? parseInt(
                              headers.get('content-range').split('/').pop(),
                              10
                          )
                        : parseInt(headers.get(countHeader.toLowerCase())),
            };
        });
    },

    update: (resource, params) => {
        console.log("entro aqui")
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }, 'UPDATE_ONE_RECORD').then(({ json }) => ({ data: json }));
    },

    // simple-rest doesn't handle provide an updateMany route, so we fallback to calling update n times instead
    updateMany: (resource, params) => {
        console.log("entro aqui")
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                }, 'UPDATE_MANY_RECORDS')
            )
        ).then(responses => ({ data: responses.map(({ json }) => json.id) }));
    },

    create: (resource, params) => {
        console.log("entro a delete")
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }, 'CREATE_RECORD').then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }));
    },

    //aaa simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    deleteMany: (resource, params) => {
        return Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}`,
                 {
                    method: 'DELETE',
                    headers: new Headers({
                        'Content-Type': 'text/plain',
                    }),
                },
                'DELETE_MANY_RECORDS',
                id)
                .then((response) => response.json)
                .catch(error => console.log(error))
            ))
            .then(responses => {
                console.log(responses)
                return { data: responses}})
            .catch(err=> Promise.reject("There was an erro "));
    }
});
