// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import { ApiCallGet } from 'src/common/ApiCall';
import Button from '@mui/material/Button'
import AccountSettings from 'src/pages/account-settings';
import MatTable from 'src/common/MaterialTable/MaterialTable';

const UserManagement = () => {
  // ** State
  const [openPopup, setopenPopup] = useState<boolean>(false);
  const [updation, setUpdation] = useState<boolean>(false);
  const [addition, setAddition] = useState<boolean>(false);
  const [tableUpdate, setTableUpdate] = useState<number>(0);
  const [row, setRow] = useState({});
  const columns = [
    { title: "Team Members", field: 'desig_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "center" } },
    { title: "Team Name", field: 'type_desc', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    { title: "Team Type", field: 'nature_desc', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
    { title: "Your Role", field: 'serial_no', type: 'numeric', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" }, hidden: true },
    { title: "Permissions", field: 'adv_no', type: 'string', cellStyle: (e, rowData) => { return { textAlign: "center" } }, headerStyle: { textAlign: "center" } },
    // { title: "Form", hidden: true, field: 'form_no', type: 'numeric', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    // { title: "OrderNo", field: 'order_no', type: 'string', cellStyle: (e, rowData) => { return { textAlign: "center" } }, headerStyle: { textAlign: "center" } },
    // { title: "OrderDate", field: 'order_date', type: 'date', dateSetting: { locale: "en-GB" }, cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    // { title: "DesigEffectiveDate", field: 'wef_date', type: 'date', dateSetting: { locale: "en-GB" }, cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    // { title: "OrderFile", field: 'order_pic', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" }, hidden: true },
    // { title: "Campus", field: 'campus_desc', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    // { title: "Department", field: 'dept_name', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    // { title: "SubDepartment", field: 'sub_dept_name', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    // { title: "Primary", field: 'is_primary', type: 'boolean', cellStyle: (e, rowData) => { return { textAlign: "center" } }, headerStyle: { textAlign: "center" } },
    // { title: "Scale", field: 'emp_scale', type: 'date', cellStyle: (e, rowData) => { return { textAlign: "center" } }, headerStyle: { textAlign: "center" } },
    // { title: "PackageType", field: 'package_desc', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    // { title: "PackageAmount", field: 'package_amount', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    // { title: "Selection Type", field: 'selection_type', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    // { title: "ContractStart", field: 'contract_startdate', type: 'date', dateSetting: { locale: "en-GB" }, cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    // { title: "ContractEnd", field: 'contract_enddate', type: 'date', dateSetting: { locale: "en-GB" }, cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    // { title: "EmpJoiningDate", field: 'joining_date', type: 'date', dateSetting: { locale: "en-GB" }, cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    // { title: "DesigLeavingDate", field: 'leaving_date', type: 'date', dateSetting: { locale: "en-GB" }, cellStyle: (e, rowData) => { return { textAlign: "center" } }, headerStyle: { textAlign: "center" } },
    // { title: "DesigLeaveStatus", field: 'leaving_desc', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
    // { title: "Designation Remarks", field: 'leave_remarks', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
    // { title: "Entered By", editable: () => true, field: 'emp_name_log', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
    // { title: "Entry Date/Time", editable: () => true, field: 'entry_datetime', type: 'date', render: (row) => DateTimeGetter(new Date(row.entry_datetime)), cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
  ];
  // ** APIS CALL
  const { response, error } = ApiCallGet('/users', { getUpdatedData: tableUpdate });


  const handlePopup = (value) => {
    setopenPopup(value);
    setAddition(value);
    setUpdation(value);
    setUserData(value)
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

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      {addition ? <AccountSettings setTableUpdate={setTableUpdate} setopenPopup={handlePopup} label={'Add'} submitAction={'Insert'} />
        : updation ?
          <AccountSettings data={row} setTableUpdate={setTableUpdate} setopenPopup={handlePopup} label={'Update'} submitAction={'Update'} setUpdation={setUpdation} /> :

          <>              <Button variant="contained" onClick={() => setAddition(!addition)}> Add Team </Button>
            <MatTable
              actionsAtStart={true}
              title=" "
              columns={columns}
              data={response??[]}
              onDelete={onDelete}
              onRowClick={(event, rowData) => {
                setRow(rowData);
                setUpdation(true);
                setopenPopup(true);
              }}
            />
          </>}
    </Card>
  )
}

export default UserManagement
