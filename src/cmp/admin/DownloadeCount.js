import React from 'react'
import Table from 'react-bootstrap/Table';

const DownloadeCount = () => {
  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Video Name</th>
          <th>Downloaded</th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>60</td>
          
        </tr>
       
      </tbody>
    </Table>
    
    </>
  )
}

export default DownloadeCount
