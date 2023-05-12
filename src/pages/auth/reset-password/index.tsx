// ** React Imports
import { ChangeEvent, useState } from 'react'

// ** Next Imports
import Router from 'next/router';

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Common Components Import
import TextField from 'src/common/FormikTextField'
import Toast from 'src/common/Toast/Toast';
import { ForgotPasswordSchema } from 'src/helpers/validations/ForgotPasswordYupSchema'
import { Formik, Form } from 'formik';
import { ApiCallPost } from 'src/common/ApiCall';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

interface State {
  email: string
}

  const Img = styled('img')(({ theme }) => ({
    marginBottom: theme.spacing(10),
    [theme.breakpoints.down('lg')]: {
      height: 37,
      marginTop: theme.spacing(9)
    },
    [theme.breakpoints.down('md')]: {
      height: 32
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(10)
    }
  }))

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

const ForgotPassword = () => {
  // ** State

  // ** Hook
  const theme = useTheme()

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const initialValues: State = {
    email: '',
  };

  const onSubmit = async (values: State, { resetForm }) => {
    try {
      const result = await ApiCallPost('user/forgot-password', values);
      if (result?.status === 200) {
        Toast(result?.data?.message, "success");
        resetForm()
        Router.push('/login');
      }
    } catch (error) {
      console.log(error, "error");
      Toast(error.message, "error");
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Img height='37' alt='error-illustration' src='/images/armergeLogo.svg' />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='h4'>Forgot Password?</Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='body2' color='textSecondary'>
              Enter the email address associated with your account, and we'll send you a link to reset your password.
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            // validationSchema={ForgotPasswordYupSchema}
          >
            {({ errors, touched }) => (
              <Form>
                               <TextField fullWidth type='email' name='email' label='Email' />
                <Button
                  type='submit'
                  variant='contained'
                  size='large'
                  fullWidth
                >
                  Send Reset Link
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
            <FooterIllustrationsV1 image1=" " image2=" " />
    </Box>
  )
}
ForgotPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ForgotPassword;
