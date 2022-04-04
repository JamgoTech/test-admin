import * as React from "react";
import { fetchUtils, Admin, Resource} from 'react-admin';
import { UserList } from "./users";
import { PostCreate, PostEdit, PostList } from "./Posts";
import simpleRestProvider from 'ra-data-simple-rest';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from "./Dashboard";
import myDataProvider from "./Dataprovider";
import { projectList } from "./Project";


const fetchJson = (url, options = {}) => {
    options.user = {
        authenticated: true,
        token: 'WpCINI6OGVXmv0rIYya4RHyqNe4t0eel'
    };
    return fetchUtils.fetchJson(url, options);
};
const dataProvider = simpleRestProvider('https://api.baserow.io/api/database/fields/table/56854/', fetchJson);
const App = () => (
        <Admin dashboard={Dashboard} dataProvider={dataProvider}>
            <Resource name= "Project" list={projectList}/>
        </Admin>
    );
    

export default App;