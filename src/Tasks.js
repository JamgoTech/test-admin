import * as React from "react";
import { List, Datagrid, TextField, BooleanField, ReferenceField, NumberField} from 'react-admin';
import { Projects } from './Project'

export const UserList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="Name" />
            <TextField source="Description" />
            <BooleanField source="Completed" />
            <ReferenceField source="user_id" reference="users">
                <TextField source="Assignee" />
            </ReferenceField>
            <NumberField source="Est. Days"/>
            <ReferenceField source="Name" reference="Projects">
                <TextField source="Project" />
            </ReferenceField>
        </Datagrid>
    </List>
);