import * as React from "react";
import { List, Datagrid, TextField,DateField, BooleanField, ReferenceField} from 'react-admin';

export const projectList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="Name" />
            <ReferenceField label="User" source="user_id" reference="users">
                <TextField source="Category" />
            </ReferenceField>
            <ReferenceField label="User" source="user_id" reference="users">
                <TextField source="Client" />
            </ReferenceField>
            <ReferenceField label="User" source="user_id" reference="users">
                <TextField source="Project Lead" />
            </ReferenceField>
            <ReferenceField label="User" source="user_id" reference="users">
                <TextField source="Project Team" />
            </ReferenceField>
            <DateField source="Kickoff Date" />
            <DateField source="Due Date" />
            <BooleanField source="Completed" />
            <TextField source="Notes" />
        </Datagrid>
    </List>
);