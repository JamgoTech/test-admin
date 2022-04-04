import * as React from "react";
import { List, Datagrid, TextField, EmailField, UrlField} from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="Name" />
            <TextField source="Role" />
            <EmailField source="Contact email" />ß
            <TextField source="About" />
            <UrlField source="Company Website" />
            <ReferenceField source="Name" reference="Projects">
                <TextField source="Project" />
            </ReferenceField>
        </Datagrid>
    </List>
);