import React from 'react'
import Table, { MTableToolbar } from 'material-table';
import { TablePagination } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from "@material-ui/core/Tooltip";
import { forwardRef } from 'react';
import {AddBox,ArrowUpward,LastPage,Remove,SaveAlt,ViewColumn,Search,Check,ChevronLeft,ChevronRight,Clear,DeleteOutline,Edit,FilterList,FirstPage} from '@material-ui/icons';
import styles from './MaterialTable.module.css';
// import pdfMake from 'pdfmake/build/pdfmake.min';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { styled, useTheme } from '@mui/material/styles'


// pdfMake.vfs = pdfFonts.pdfMake.vfs;
const MatTable = (props) => {
    const theme=useTheme()
    console.log(props)
    const tableRef = React.createRef();
    const styleObject = { overflowY: "auto", display: 'unset !important' };

    const editableObject = {
        onRowAdd: (props?.onAdd === undefined) ? null : (row) => new Promise((resolve, reject) => {
            props.onAdd(row);
            resolve();
        }),
        onRowDelete: (props?.onDelete === undefined) ? null : (row) => new Promise((resolve, reject) => {
            props.onDelete(row);
            resolve();
        }),
        onRowUpdate: (props?.onUpdate === undefined) ? null : (updatedRow, oldRow) => new Promise((resolve, reject) => {
            props.onUpdate(oldRow, updatedRow);
            resolve();
        })
    };

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} style={{ fontSize: '18px' }} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    const exportPdfCustom = (columns, data) => {
        // const filteredColumns = columns.filter(
        //   (c) => typeof c.field === 'string' && typeof c.title === 'string'
        // );
        const filteredColumns = columns;
        const fields = filteredColumns.map((c) => c.field);

        const docDefinition = {
            pageOrientation: 'landscape',
            defaultStyle: {
                // fontSize: Math.ceil((fields.length/100) *12),
                fontSize: Math.ceil(100 / fields.length),
                bold: true,
                border: '1px solid black'
            },
            content: [
                {
                    //   layout: 'lightHorizontalLines',
                    layout: {
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                        }
                    },

                    table: {
                        headerRows: 1,
                        widths: filteredColumns.map(() => 'auto'),

                        // widths: [ '*', 'auto', 100, '*' ],

                        body: [
                            filteredColumns.map((c) => c.title),
                            ...data.map((row) => fields.map((f) => row[f])),
                        ],
                    },
                },
            ],
        };
        // pdfMake.createPdf(docDefinition).download('Title');
    };

    const options = {
        actionsColumnIndex: (props.actionsAtStart === true) ? 0 : -1,
        doubleHorizontalScroll: true,
        addRowPosition: "first",
        paging: true,
        pageSizeOptions: [10, 20, 30, 50, 100, 150, 500, 1000, 3000, 5000, 10000],
        pageSize: 30,
        emptyRowsWhenPaging: false,
        exportPdf: exportPdfCustom,
        // filtering: true,
        // exportAllData: true,
        // exportButton: {
        //     csv: true,
        //     pdf: false
        // },
        headerStyle: {
            paddingTop: 0,
            paddingBottom: 0,
            whiteSpace: "nowrap",
            backgroundColor:  theme.palette.primary.main,
            color:theme.palette.common.white,
            position: 'sticky', top: 0,
            fontWeight: 'bold',
            overflow: 'hidden !important',
        },
        maxBodyHeight: props?.bodyHeight ?? '100%',
        rowStyle: (data, index) => {
            if (index % 2) {
                return {
                    backgroundColor: props.onRowClick ? 'none' : "#ecf2f9",
                    padding: 0,
                    margin: 0,
                    height: '5px',
                    whiteSpace: "nowrap",
                    fontSize: '12px',
                }
            }
            else {
                return {
                    padding: 0,
                    margin: 0,
                    height: '5px',
                    whiteSpace: "nowrap",
                    fontSize: '12px',
                }
            }
        },
        th:{
            borderRadius: "20px 20px 0px 0px"
        },
        searchFieldStyle:{
background: "#FFFFFF",
border: "1px solid #F2F2F2",
boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.04)",
borderRadius: "4px"
        },
        tr: {
            paddingTop: 0,
            paddingBottom: 0,
            // padding: 0,
            // margin: 0,
            height: 'auto !important',
        },
        td: {
            padding: '0 !important',
            paddingTop: 0,
            paddingBottom: 0,
            borderRight: '1px solid #eee',

        },
        cellStyle: {
            backgroundColor: '#039be5',
            color: '#FFF',
            paddingTop: 0,
            paddingBottom: 0,
            margin: '0 !important',
            height: 10,
            whiteSpace: "nowrap",
            borderRight: '1px solid #eee',
        },
        actionsCellStyle: {
            padding: '5px',
        },
        padding: 'dense',
    }

    // console.log(props);

    const totalRow = props.totalRow;
    const CustomAdd = props.customAdd;
    // const onRowClick = props.onRowClick
    // console.log(props.options)
    return (

        <>
            <Table tableRef={tableRef} isLoading={props.isLoading ?? false} icons={tableIcons ?? {}} style={(props.style === undefined) ? { ...styleObject } : { ...styleObject, ...props.style }} title={props.title} data={props.data} columns={props.columns} options={(props.Options !== undefined) ? { ...options, ...props.Options } : { ...options }} editable={editableObject} onRowClick={props.onRowClick ?? false} detailPanel={props.detailPanel ?? null}
                localization={{
                    toolbar: {
                        exportCSVName: "Export as CSV",
                        exportPDFName: "Export as PDF"
                    }
                }}
                editingMode={props?.editingMode && props?.editingMode}
                enableEditing={props?.enableEditing && props?.enableEditing}
                onEditingRowSave={props?.onEditingRowSave && props?.onEditingRowSave}
                components={{
                    Pagination: (props) => (
                        <>
                            {totalRow ? totalRow : null}
                            <TablePagination {...props}
                                style={{ overflowX: 'none', float: 'right' }}
                            />
                        </>),
                    Toolbar: (props) => (
                        <>
                            {CustomAdd ?
                                <div className={`d-flex align-items-center w-100 ${styles.headers}`}>
                                    <div className='col-11'>
                                        <MTableToolbar {...props} />
                                    </div>

                                    <div className='col-1'>
                                        <Tooltip title='Add'>

                                            <IconButton onClick={CustomAdd}>
                                                <AddBox>
                                                    Add
                                                </AddBox>
                                            </IconButton>
                                        </Tooltip>

                                    </div>

                                </div> : <MTableToolbar {...props} />}
                        </>
                    ),
                }} />
        </>

    );

}

export default MatTable;