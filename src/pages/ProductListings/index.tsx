// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

import Button from '@mui/material/Button'
import AccountSettings from 'src/pages/account-settings';
import CustomizedDataGrid from 'src/common/MuiGrid';
import { Add } from '@mui/icons-material'
import Router from 'next/router';

// ** Custom Components
import guidelines from 'src/common/Guidelines';
import { ApiCallGet,ApiCallPost } from 'src/common/ApiCall';
import Formheading from 'src/common/Formheading';
import Toggle from 'src/common/Toggle';
import { GridColDef } from '@mui/x-data-grid';
import Toast from 'src/common/Toast/Toast';

const ProductListings = () => {
  // ** State
  const [openPopup, setopenPopup] = useState<boolean>(false);
  const [updation, setUpdation] = useState<boolean>(false);
  const [addition, setAddition] = useState<boolean>(false);
  const [tableUpdate, setTableUpdate] = useState<number>(0);
  const [row, setRow] = useState({});
  const [rowData, setRowData] = useState([
    // Your row data array
  ]);

  const handleToggle = (index) => (event) => {
    const newData = [...rowData];
    newData[index].try_on_visibility = event.target.checked;
    setRowData(newData);
  };
const columns: GridColDef[] = [
    {
        field: 'id',
        hideable: false
      },
      {
        field: 'image',
        headerName: 'Image',
        imageUrl: '../', // URL of the image
        width: 150,
        editable: true,
      },
    {
      field: 'product_id',
      headerName: 'Product ID',
      width: 150,
      editable: true,
    },
    {
      field: 'title',
      headerName: 'Product Name',
      width: 110,
      editable: true,
    },
    {
      field: 'product_details',
      headerName: 'Product Details',
      width: 160,
      editable: true,

    },
    {
        field: 'try_on_visibility',
        headerName: 'Try-On Visibility',
        width: 160,
        editable: true,
        renderCell: (params) => {
            return (
              <Toggle
                checked={params.value}
                onChange={handleToggle(params.value)}
              />
            );
          },
      },
      {
        field: '3d_object_visibility',
        headerName: '3D Objects',
        width: 160,
        editable: true,

      },
      {
        field: 'added_date',
        headerName: 'Added Date',
        width: 160,
        editable: true,

      },
      {
        field: 'details',
        headerName: 'Details',
        width: 160,
        editable: true,
      },
      
  ];

  const rows = [
    {id:1,image:"image",product_id:"product_id",product_name:"product_name",product_details:"product_details",try_on_visibility:true,"3d_object_visibility":"3d_object_visibility",added_date:"added_date",details:"details"}
    ];
  // ** APIS CALL
  let storeID= "";
  if (typeof window !== 'undefined' && window.localStorage) {
    storeID=localStorage.getItem('storeID');
  }
  const { response, error } = ApiCallGet(`store/products/${storeID}`, { getUpdatedData: tableUpdate });
    

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



  return (
    <Box>
      <Formheading label="Product Listing"/>
      {addition ? <AccountSettings setTableUpdate={setTableUpdate} setopenPopup={handlePopup} label={'Add'} submitAction={'Insert'} />
        : updation ?
          <AccountSettings data={row} setTableUpdate={setTableUpdate} setopenPopup={handlePopup} label={'Update'} submitAction={'Update'} setUpdation={setUpdation} /> :

          <div className="row p-3" style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"10px"}} >             
         
 <CustomizedDataGrid
      rows={response ?? rows}
      columns={columns}
      onRowClick={(params) => console.log('Row clicked:', params)}
      onCellEditCommit={(params) => console.log('Cell edited:', params)}
      onSortModelChange={(model) => console.log('Sort model changed:', model)}
      onFilterModelChange={(model) => console.log('Filter model changed:', model)}
filtering={true}
    />
<div className={`${guidelines.inputclass}`}>
<Button variant="contained" 
        //    onClick={() => Router.push('/team-management/addTeamMembers')}
           > Upload 3D Model </Button>
</div>
<div className={`${guidelines.inputclass}`}>

            <Button variant="outlined" className={`${guidelines.inputclass}`}
        //    onClick={() => Router.push('/team-management/addTeamMembers')}
           > Place Order for 3D Model </Button>
              </div>
              </div>}

    </Box>
  )
}

export default ProductListings
