import * as React from "react";
import { List, Datagrid, TextField,DateField, BooleanField} from 'react-admin';

export const projectList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="Name" />
            <DateField source="Kickoff Date" />
            <DateField source="Due Date" />
            <BooleanField source="Completed" />
            <TextField source="Notes" />
        </Datagrid>
    </List>
);