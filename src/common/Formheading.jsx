import { Divider, Typography } from '@mui/material'
export default function Formheading(props) {
    return (
        <div container style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
            <Typography sx={{ mb: 1.5 }} variant="h4" color="primary.main" divider>
                <b>{props.label}</b>
            </Typography>
            <Divider sx={{
                 fontSize: "40px", fontWeight: '400', marginBottom: '1rem',color:"primary.main"
            }} />
        </div>
    )
}
