import { Admin, Resource} from 'react-admin';
import {UserList} from "./users";
import {PostList} from './posts';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from './Dashboard';
import {dataProvider} from './dummy';
import authProvider from './authProvider';

function App() {
  return (<Admin authProvider={authProvider} dashboard={Dashboard} dataProvider={dataProvider}>
    <Resource name="57716" list={PostList} />
    <Resource name="57146" list={UserList} icon={UserIcon} />
  </Admin>);
}
export default App;
