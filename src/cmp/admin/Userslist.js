import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import { adminAllUser } from '../../Service/adminService';



const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'userName', headerName: 'Name', width: 150 },
  { field: 'userEmail', headerName: 'Email', width: 150 },
  { field: 'userPhone', headerName: 'Phone', width:150 },
  { field: 'userAge', headerName: 'Age', type: 'number',  },
  { field: 'UserPassword', headerName: 'Password', type:'text', width: 150 },
];



export default function Userslist() {
  const [rows, setRows]=React.useState([])
  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [''],
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});

  React.useEffect(()=>{
    getData()
  },[])

  const getData = () => {
    var data = {};

    adminAllUser(data)
      .then(result=> {
        // console.log("response", result);
        if (result.data.success) {
          toast.success(result.data.message);
          setRows(result.data.response);
        } else {
          toast.error(result.data.message);
        }
      })
     
  }
  
  

  return (
    <Box sx={{ width: 1 }}>
      <FormControlLabel
        checked={columnVisibilityModel.id !== false}
        onChange={(event) =>
          setColumnVisibilityModel(() => ({ id: event.target.checked }))
        }
        control={<Switch color="primary" size="small" />}
        label="Show ID column"
      />
      <FormControlLabel
        checked={filterModel.quickFilterExcludeHiddenColumns}
        onChange={(event) =>
          setFilterModel((model) => ({
            ...model,
            quickFilterExcludeHiddenColumns: event.target.checked,
          }))
        }
        control={<Switch color="primary" size="small" />}
        label="Exclude hidden columns"
      />
      <Box sx={{ height: 700 }}>
        <DataGrid
          columns={columns}
          rows={rows}
          disableColumnFilter
          disableDensitySelector
          slots={{ toolbar: GridToolbar }}
          filterModel={filterModel}
          onFilterModelChange={(newModel) => setFilterModel(newModel)}
          slotProps={{ toolbar: { showQuickFilter: true } }}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
        />
      </Box>
      <ToastContainer/>
    </Box>
  );
}
