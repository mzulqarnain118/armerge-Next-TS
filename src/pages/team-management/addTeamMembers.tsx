// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import {Box,Stack} from '@mui/material'
import { ApiCallGet } from 'src/common/ApiCall';
import Formheading from 'src/common/Formheading';
import Button from '@mui/material/Button'
import AccountSettings from 'src/pages/account-settings';
import CustomizedDataGrid from 'src/common/MuiGrid';
import { Add,ArrowBackIosNew} from '@mui/icons-material'
import Router from 'next/router';
import Toast from 'src/common/Toast/Toast';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ApiCallPost } from 'src/common/ApiCall';


const AddTeamMembers = () => {
  // ** State
  const [openPopup, setopenPopup] = useState<boolean>(false);
  const [updation, setUpdation] = useState<boolean>(false);
  const [addition, setAddition] = useState<boolean>(false);
  const [tableUpdate, setTableUpdate] = useState<number>(0);
  const [row, setRow] = useState({});
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'Team Member',
      headerName: 'Team Member',
      width: 150,
      editable: true,
    },
    {
      field: 'Email',
      headerName: 'email',
      width: 150,
      editable: true,
    },
    {
      field: 'role',
      headerName: 'Your Role',
      width: 110,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  // ** APIS CALL
  const { response, error } = ApiCallGet('/users', { getUpdatedData: tableUpdate });
    

  const handlePopup = (value) => {
    setopenPopup(value);
    setAddition(value);
    setUpdation(value);
  }

  const onDelete = async (row) => {
    var result = await ApiCallPost("/delete_emp_designation", { serial_no: row.serial_no });
    if (result.error) {
      Toast('Data Could Not be Deleted', 'error')
    }
    else {
      if (result.data[0].status === 0) {
        setTableUpdate(old => old + 1);
        Toast('Data Deleted Successfully!', 'success')
      } else {
        Toast('Cannot delete primary designation! Please mark another designation as primary!', 'error')
      }
    }
  };


    const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  return (
    <Box>
      <Formheading label="3D Modelers"/>
      {addition ? <AccountSettings setTableUpdate={setTableUpdate} setopenPopup={handlePopup} label={'Add'} submitAction={'Insert'} />
        : updation ?
          <AccountSettings data={row} setTableUpdate={setTableUpdate} setopenPopup={handlePopup} label={'Update'} submitAction={'Update'} setUpdation={setUpdation} /> :

          <>
{/* <Stack sx={{display:"flex",alignItems:"center",flexDirection:"row",gap:"15px"}}>
<Box
      sx={{
        '& > :not(style)': {
          m: 2,
        },
        backgroundColor: 'white',
        borderRadius: '5px',
        color: 'primary.main',
        width: 'fit-content',
      }}
      onClick={() => Router.back() }
    >
      <ArrowBackIosNew/>
    </Box>
     <Button variant="contained" 
          //  onClick={() => setAddition(!addition)}
           >Add Team Members <Add /></Button>
</Stack> */}
             
 <CustomizedDataGrid
      rows={response ?? rows}
      columns={columns}
      onRowClick={(params) => console.log('Row clicked:', params)}
      onCellEditCommit={(params) => console.log('Cell edited:', params)}
      onSortModelChange={(model) => console.log('Sort model changed:', model)}
      onFilterModelChange={(model) => console.log('Filter model changed:', model)}
actions={true}
filtering={true}
    />
              </>}

    </Box>
  )
}

export default AddTeamMembers
