import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  UrlField,
  ReferenceArrayField,
  EditButton,
  Edit,
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  SingleFieldList,
  ChipField,
  DeleteButton,
} from "react-admin";
import { Fragment } from 'react';
import { BulkDeleteButton } from 'react-admin';


const PostBulkActionButtons = props => (
  <Fragment>
      <BulkDeleteButton {...props} />
  </Fragment>
);

export const PostList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
       <ReferenceArrayField target="id" reference="57146"> 
       <SingleFieldList>
          <ChipField source="Name" />
        </SingleFieldList>
      </ReferenceArrayField> 
      <TextField source="id" />
      <TextField source="order" />
      <TextField source="Name" />
      <TextField source="Body" />
      <DeleteButton/>
    </Datagrid>
  </List>
);
// eexport const PostEdit = () => (
//     <Edit>
//         <SimpleForm>
//             {/* <ReferenceInput source="id" reference="57146">;
//                 <SelectInput optionText="id" />;
//             </ReferenceInput>; */}
//             <TextInput source="id" />
//             <TextInput source="Name" />
//             <TextInput source="Body" />
//         </SimpleForm>
//     </Edit>
// );
