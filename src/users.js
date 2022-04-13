import * as React from "react";
import MyUrlField from './MyUrlField';
import {
    List,
    Datagrid,
    TextField,
    UrlField,
    EmailField,
    ReferenceField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
} from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="Name" />
            <TextField source="Username" />
            <EmailField source="email" />
            <UrlField source="images" />
        </Datagrid>
    </List>
);