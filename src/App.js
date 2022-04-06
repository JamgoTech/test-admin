import * as React from "react";
import { fetchUtils, Admin, Resource, ListGuesser } from 'react-admin';
import { UserList } from "./users";
import { PostCreate, PostEdit, PostList } from "./Posts";
import simpleRestProvider from 'ra-data-simple-rest';
import Dashboard from "./Dashboard";
import { projectList } from "./Project";
import axios from "axios";
import { HttpError } from 'react-admin';

const tables = { "projects": 56856, "clients": 56857 };

// const httpClient = (url, options = {}) => {
//    options.user = {
//      authenticated: true,
//      token: 'WpCINI6OGVXmv0rIYya4RHyqNe4t0eel',
//    }
//    return fetchUtils.fetchJson(url, options);
//  }

// const dataProvider = simpleRestProvider('https://api.baserow.io/api/database/fields/table/56854/');
// const dataProvider = dataProvider('https://api.baserow.io/api/database/fields/table/56854/', httpClient);
// console.log(dataProvider);

/////// Data Provider //// 

// const axios = require('axios')

//const table_56856 = axios.create({  // one table = one resource
//    baseURL: "https://api.baserow.io/api/database/rows/table/56856/?user_field_names=true",
//    timeout: 1000,
//    headers: {
//        Authorization: "Token WpCINI6OGVXmv0rIYya4RHyqNe4t0eel" 
//      }
//  });

const dataProvider = {
  getList: (resource, params) => {
    return axios({
      method: "GET",
      url: "https://api.baserow.io/api/database/rows/table/57146/?user_field_names=true",
      headers: {
        Authorization: "Token CIGFBxviZqwUlt6dkrSi8zch3V136wH5"
      }
    })
      .then(response => {

        if (response.status < 200 || response.status >= 300) {
          return Promise.reject(
            new HttpError(
              "Server Error"
            )
          );
        }

        return Promise.resolve({
          data: response.data.results.map(rec => {
            return {
              id: rec.id,
              email: rec.email,
              Username: rec.Username,
              Name: rec.Name,
              images: rec.images[0].url,
              UsersPosts: rec.UsersPosts[0].value
            }
          }),
          total: response.data.results.length,
        }
        );
      })
      .catch(error => {
        return Promise.reject(
          new HttpError(
            error.message
          )
        );
      })
  }
};

//    getOne:     (resource, params) => Promise,
//    getMany:    (resource, params) => Promise,
//    getManyReference: (resource, params) => Promise,
//    create:     (resource, params) => axios({
//        method: "POST",
//        url: "https://api.baserow.io/api/database/rows/table/"+tables[resource]+"/?user_field_names=true",
//        headers: {
//          Authorization: "Token WpCINI6OGVXmv0rIYya4RHyqNe4t0eel" ,
//        data: params,
//      })
//    },
//    update:     (resource, params) => Promise,
//    updateMany: (resource, params) => Promise,
//    delete:     (resource, params) => Promise,
//    deleteMany: (resource, params) => Promise,
//      })

const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider}>
    <Resource name="projects" list={ListGuesser} />
  </Admin>
);


export default App;