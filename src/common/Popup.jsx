import React from 'react'
import { DialogTitle, Typography, Dialog, DialogContent, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing = (2), position: 'absolute',

    },
    root: {
        minWidth: 0,
        margin: theme.spacing = (0.5)
    },
    // secondary: {
    //     backgroundColor: theme.palette.secondary.light,
    //     '& .MuiButton-label': {
    //         color: theme.palette.secondary.main,
    //     }
    // }
}))
export default function Popup(props) {
    const { width, title, children, openPopup, setOpenPopup, customStyle } = props;
    const classes = useStyles();
    const [local, setLocal] = React.useState(undefined)
    useEffect(() => {
        if (local !== undefined){
            props.setOpenPopup(false)
        }
    }, [local])
    

    return (
        <Dialog fullWidth maxWidth={width ?? 'md'} open={openPopup} classes={{ paper: classes.dialogWrapper }} >
            <DialogTitle >
                <div className='row' style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant='h6' component='div' style={{ flexGrow: 1 }}> {title} </Typography>
                    <Button variant='contained' size='small' color='secondary'
                        style={{ backgroundColor: '#ef5350' }}
                        onClick={() => {
                            setLocal(!local)
                            if (props.onClose)
                                props.onClose();
                        }}><CloseIcon /></Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
