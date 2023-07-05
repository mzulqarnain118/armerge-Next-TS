// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { ApiCallGet } from 'src/common/ApiCall';
import Formheading from 'src/common/Formheading';
import Button from '@mui/material/Button'
import AccountSettings from 'src/pages/account-settings';
import CustomizedDataGrid from 'src/common/MuiGrid';
import { Add } from '@mui/icons-material'
import Router from 'next/router';
import Toast from 'src/common/Toast/Toast';
import { ApiCallPost } from 'src/common/ApiCall';
import { GridColDef } from '@mui/x-data-grid';

const UserManagement = () => {
  // ** State
  const [openPopup, setopenPopup] = useState<boolean>(false);
  const [updation, setUpdation] = useState<boolean>(false);
  const [addition, setAddition] = useState<boolean>(false);
  const [tableUpdate, setTableUpdate] = useState<number>(0);
  const [row, setRow] = useState({});
const columns: GridColDef[] = [
    {
      field: '',
      headerName: 'Team Name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Team Type',
      width: 150,
      editable: true,
    },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 110,
    //   editable: true,
    // },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
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
      <Formheading label="Team Management"/>
      {addition ? <AccountSettings setTableUpdate={setTableUpdate} setopenPopup={handlePopup} label={'Add'} submitAction={'Insert'} />
        : updation ?
          <AccountSettings data={row} setTableUpdate={setTableUpdate} setopenPopup={handlePopup} label={'Update'} submitAction={'Update'} setUpdation={setUpdation} /> :

          <>             
           <Button variant="contained" 
           onClick={() => Router.push('/team-management/addTeamMembers')}
           > Add Team <Add /></Button>
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

export default UserManagement
