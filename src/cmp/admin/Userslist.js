import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { randomTraderName, randomEmail } from '@mui/x-data-grid-generator';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 150 },
  { field: 'phone', headerName: 'Phone', },
  { field: 'age', headerName: 'Age', type: 'number',  },
  { field: 'password', headerName: 'Password', type:'text', width: 150 },
];

const rows = [
  { id: 1, name: randomTraderName(), email: randomEmail(), phone:99338274, age: 25 },
  { id: 2, name: randomTraderName(), email: randomEmail(), phone:99338274,age: 36 },
  { id: 3, name: randomTraderName(), email: randomEmail(), phone:99338274,age: 19 },
  { id: 4, name: randomTraderName(), email: randomEmail(), phone:99338274,age: 28 },
  { id: 5, name: randomTraderName(), email: randomEmail(), phone:99338274,age: 23 },
  { id: 6, name: randomTraderName(), email: randomEmail(), phone:99338274,age: 27 },
  { id: 7, name: randomTraderName(), email: randomEmail(), phone:99338274,age: 18 },
  { id: 8, name: randomTraderName(), email: randomEmail(), phone:99338274,age: 31 },
  { id: 9, name: randomTraderName(), email: randomEmail(), phone:99338274,age: 24 },
  { id: 10, name: randomTraderName(),email: randomEmail(), phone:99338274,age: 35 },
];

export default function Userslist() {
  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [''],
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});

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
    </Box>
  );
}
