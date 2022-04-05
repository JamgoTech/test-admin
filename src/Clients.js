import * as React from "react";
import { List, Datagrid, TextField, EmailField, UrlField} from 'react-admin';

export const clientList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="Company Name" />
            <TextField source="Contact Person" />
            <EmailField source="Contact email" />
            <TextField source="About" />
            <UrlField source="Company Website" />     
        </Datagrid>
    </List>
);