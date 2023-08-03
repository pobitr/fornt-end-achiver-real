import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Table from 'react-bootstrap/Table';


export default function Review() {
  const [value, setValue] = React.useState(2);



  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>User Name</th>
          <th>Course Name</th>
          <th>Feedbacks</th>
          <th>Reviews</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>Nice </td>
          <td><Rating name="size-medium" defaultValue={2} /></td>
        </tr>
        
      </tbody>
    </Table>
    
    </>
  );
}
