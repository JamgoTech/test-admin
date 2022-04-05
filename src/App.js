import * as React from "react";
import { fetchUtils, Admin, Resource, ListGuesser} from 'react-admin';
import { UserList } from "./users";
import { PostCreate, PostEdit, PostList } from "./Posts";
import simpleRestProvider from 'ra-data-simple-rest';
import Dashboard from "./Dashboard";
import { projectList } from "./Project";


const httpClient = (url, options = {}) => {
    options.user = {
      authenticated: true,
      token: 'WpCINI6OGVXmv0rIYya4RHyqNe4t0eel',
    }
    return fetchUtils.fetchJson(url, options);
  }

const dataProvider = simpleRestProvider('https://api.baserow.io/api/database/fields/table/56854/');
 // const dataProvider = dataProvider('https://api.baserow.io/api/database/fields/table/56854/', httpClient);
 // console.log(dataProvider);

const App = () => (
        <Admin dashboard={Dashboard} dataProvider={dataProvider}>
            <Resource name= "projectList" list={projectList}/>
        </Admin>
    );
    

export default App;