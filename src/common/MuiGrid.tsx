import * as React from 'react'
import Box from '@mui/material/Box'
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridValueGetterParams,
  GridSortModel,
  GridFilterModel,
  GridRowId,
  GridCsvExportOptions,
  GridCellParams
} from '@mui/x-data-grid'
import { Visibility, Edit, Delete, Save, Cancel } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import { Snackbar } from '@mui/material'

// Define the type for the row data
type RowData = {
  [key: string]: string | number | null
}

// Define the type for the DataGrid props
type CustomizedDataGridProps = {
  rows: RowData[]
  columns: GridColDef[]
  pageSize?: number
  pageSizeOptions?: number[]
  isPaginationEnabled?: boolean
  checkboxSelection?: boolean
  disableRowSelectionOnClick?: boolean
  sorting?: boolean
  filtering?: boolean
  editable?: boolean
  scroll?: boolean
  onRowClick?: (params: GridRowId) => void
  onCellEditCommit?: (params: GridValueGetterParams) => void
  onSortModelChange?: (model: GridSortModel) => void
  onFilterModelChange?: (model: GridFilterModel) => void
  onExport?: (options?: GridCsvExportOptions) => void
  onEdit?: (id: number, updatedData: RowData) => void
  onDelete?: (id: number) => void
  actions?: boolean // New prop for showing/hiding actions
}

const CustomizedDataGrid: React.FC<CustomizedDataGridProps> = ({
  rows,
  columns,
  pageSizeOptions = [5, 10, 20, 50, 100],
  isPaginationEnabled = true,
  checkboxSelection = false,
  disableRowSelectionOnClick = true,
  filtering = false,
  scroll = true,
  onRowClick,
  onCellEditCommit,
  onSortModelChange,
  onFilterModelChange,
  onEdit,
  onDelete,
  actions = false // Default value is false
}) => {
  const [editRowsModel, setEditRowsModel] = React.useState({})

  const handleEditClick = (id: number, rowData: RowData) => {
    setEditRowsModel(prevModel => ({ ...prevModel, [id]: { ...rowData } }))
  }

  const handleCancelClick = (id: number) => {
    setEditRowsModel(prevModel => {
      const updatedModel = { ...prevModel }
      delete updatedModel[id]
      return updatedModel
    })
  }

  const handleSaveClick = (id: number, updatedData: RowData) => {
    if (onEdit) {
      onEdit(id, updatedData)
    }
    setEditRowsModel(prevModel => {
      const updatedModel = { ...prevModel }
      delete updatedModel[id]

      return updatedModel
    })
    // Show a toast or snackbar message indicating the record was updated
    // You can use a Snackbar component from Material-UI
  }

  const handleDeleteClick = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this record?')
    if (confirmDelete && onDelete) {
      onDelete(id)
    }
    // Show a toast or snackbar message indicating the record was deleted
    // You can use a Snackbar component from Material-UI
  }

  const renderActions = (params: GridCellParams) => {
    const id = params.row.id as number
    const isEditing = Boolean(editRowsModel[id])
    console.log('isEditing:', isEditing)
    const handleView = () => {
      console.log('View clicked:', params.row)
      // Show popup with data
    }

    const handleEdit = () => {
      console.log('Edit clicked:', params.row)
      handleEditClick(id, params.row)
    }

    const handleDelete = () => {
      console.log('Delete clicked:', params.row)
      handleDeleteClick(id)
    }

    const handleCancel = () => {
      console.log('Cancel clicked:', params.row)
      handleCancelClick(id)
    }

    const handleSave = () => {
      console.log('Save clicked:', params.row)
      handleSaveClick(id, editRowsModel[id])
    }

    return (
      <>
        {isEditing ? (
          <>
            <IconButton onClick={handleSave}>
              <Save />
            </IconButton>
            <IconButton onClick={handleCancel}>
              <Cancel />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={handleView}>
              <Visibility />
            </IconButton>
            <IconButton onClick={handleEdit}>
              <Edit />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <Delete />
            </IconButton>
          </>
        )}
      </>
    )
  }

  const updatedColumns: GridColDef[] = [
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: renderActions
    },
    ...columns
  ]

  return (
    <Box sx={{ height: '560px', width: '100%', margin: '10px' }}>
      <DataGrid
        rows={rows}
        columns={actions ? updatedColumns : columns}
        pageSizeOptions={pageSizeOptions}
        pagination={isPaginationEnabled as true}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        scrollbarSize={scroll ? 12 : 0}
        onSortModelChange={onSortModelChange}
        onFilterModelChange={onFilterModelChange}
        slots={filtering && { toolbar: GridToolbar }}
        {...{ editRowsModel }}
        {...{
          onEditCellChange: params => {
            const { id, field, value } = params
            setEditRowsModel(prevModel => ({
              ...prevModel,
              [id]: {
                ...(prevModel[id] || {}),
                [field]: value
              }
            }))
          }
        }}
        // initialState={{
        //   ...rows.initialState,
        //   pagination: { paginationModel: { pageSize: 5 } }
        // }}
        getRowClassName={params => `super-app-theme--open`}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main'
          }
        }}
      />
    </Box>
  )
}

export default CustomizedDataGrid
