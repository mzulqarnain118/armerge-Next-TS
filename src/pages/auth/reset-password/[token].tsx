// ** Re act Impo rts
import { useState,useEffect, Fragment, ChangeEvent, MouseEvent, ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'
import Router,{useRouter} from 'next/router';

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Common Components Import
import TextField from 'src/common/FormikTextField'
import PasswordField from 'src/common/PasswordField'
import Toast from 'src/common/Toast/Toast';
import { ResetSchema } from 'src/helpers/validations/resetYup'
import { Formik, Form } from 'formik';
import { ApiCallPost } from 'src/common/ApiCall';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

interface State {
  password: string
  confirmPassword: string
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

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
const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))


const ResetPassword = () => {
  // ** States
  // const [showPassword, setShowPassword] = useState<Boolean>(false)
  // const [showConfirmPassword, setShowConfirmPassword] = useState<Boolean>(false)

  const initialValues: State = {
    password: '',
    confirmPassword: '',
  };

  // ** Hook
  const theme = useTheme()
 const router = useRouter();
  const { token } =  router.query;


  const onSubmit = async (values: State, { resetForm }) => {
    delete values.confirmPassword;
    try {
      const result = await ApiCallPost('user/sign-up', values);

      if (result?.status === 201) {
        resetForm()
        Toast("Password Changed Successfully", "success");
        Router.push('/auth/login');
      }
    } catch (error) {
      resetForm()
      console.log(error, "error")
      Toast(error.message, "error");
    }
  }
 const validateToken = async (values: State) => {
    try {
      const result = await ApiCallPost(`user/reset-password/${token}`,{newPassword:values.password});

      if (result?.status === 201) {
        Toast("Password Changed Successfully", "success");
        Router.push('/auth/login');
      }
    } catch (error) {
      console.log(error, "error")
      Toast(error.message, "error");
    }
  }
  // useEffect(()=>{
  //   token && validateToken()
  // },[token])

  
  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Img height='37' alt='error-illustration' src='/images/armergeLogo.svg' />
          </Box>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5, fontSize: '30px' }}>
              Reset Password
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues}
            onSubmit={validateToken}
            validationSchema={ResetSchema}>
            {({ errors, touched, values, dirty, isValid, handleChange, handleBlur }) => (
              <Form className="row">
                <PasswordField  name='password' label='Password' />
                <PasswordField  name='confirmPassword' label='Confirm Password' />
                <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 3 }}>
                  Reset
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <Typography variant='body2'>
                    <Link passHref href='/auth/login'>
                      <LinkStyled>Sign in instead</LinkStyled>
                    </Link>
                  </Typography>
                </Box>
                {/* <Divider sx={{ my: 5 }}>or</Divider>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Link href='/' passHref>
                    <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                      <Google sx={{ color: '#db4437' }} />
                    </IconButton>
                  </Link>
                </Box> */}
              </Form>

            )}
          </Formik>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 image1=" " image2=" " />
    </Box>
  )
}

ResetPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ResetPassword
