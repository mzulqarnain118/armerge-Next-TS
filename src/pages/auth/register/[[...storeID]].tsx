// ** React Imports
import { useState, useEffect, Fragment, ChangeEvent, MouseEvent, ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'
import Router, { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Common Components Import
import TextField from 'src/common/FormikTextField'
import PasswordField from 'src/common/PasswordField'
import Toast from 'src/common/Toast/Toast'
import { signUpSchema } from 'src/helpers/validations/signUpSchema'
import { Formik, Form } from 'formik'
import { ApiCallPost, ApiCallGetSimple } from 'src/common/ApiCall'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

interface State {
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  email: string
}

//SIGN-IN WITH GOOGLE IMPORTS
// import { loadAuth2, signIn } from 'google-signin-client';

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

export const ResponsiveCardContent = styled(CardContent)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(12, 49, 7)
  },
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(12, 9, 7)
  }
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

export const LeftContent = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    display: 'none'
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

const RegisterPage = () => {
  console.log(process.env.LIVE, 'process.env.LIVE')

  // ** States
  // const [showPassword, setShowPassword] = useState<Boolean>(false)
  // const [showConfirmPassword, setShowConfirmPassword] = useState<Boolean>(false)
  const router = useRouter()
  const { storeID } = router.query
  console.log(storeID)
  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('storeID', String(storeID))
    }
  }, [storeID])
  const initialValues: State = {
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: ''
  }

  // ** Hook
  const theme = useTheme()

  const onSubmit = async (values: State, { resetForm }) => {
    delete values.confirmPassword
    try {
      const result = await ApiCallPost('user/sign-up', values)

      if (result?.status === 201) {
        resetForm()
        Toast('Registered Successfully', 'success')
        const accessToken = result?.data?.data?.accessToken
        const refreshToken = result?.data?.data?.refreshToken
        const user = result?.data?.data.user
        localStorage.setItem('token', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('loggedIn', String(true))
        localStorage.setItem('email', user?.email)
        localStorage.setItem('role', user?.role)
        localStorage.setItem('id', user?._id)
        localStorage.setItem('hideSuccessBar', user?.hideSuccessBar)
        localStorage.setItem('name', user?.firstName + ' ' + user?.lastName)
        localStorage.setItem('user', JSON.stringify(user)) // store as a string
        localStorage.setItem('isEmailVerified', user?.isEmailVerified)
        Router.push('/')
      }
    } catch (error) {
      resetForm()
      console.log(error, 'error')
      Toast(error.message, 'error')
    }
  }

  async function handleGoogleSignIn() {
    try {
      // Load the Google Sign-In client library
      // await loadAuth2({
      //   client_id: 'YOUR_CLIENT_ID', // Replace with your own client ID
      // });

      // // Sign in the user
      // const response = await signIn({
      //   scope: 'profile email', // Add any additional scopes you require
      // });

      // Extract the necessary data from the response
      // const { id_token } = response.getAuthResponse();
      // const { email, name, picture } = response.getBasicProfile();

      // Prepare the payload for your backend API
      // const payload = {
      //   idToken: id_token,
      //   email,
      //   firstName:name,
      // };

      const response = await ApiCallGetSimple('user/sign-up/google')
 
      // Handle the response from your backend API
      if (response) {
        console.log(response)
        // Success: Handle the successful response
        // const data = await apiResponse.json();
        // ...
      } else {
        // Error: Handle the error response
        // const error = await apiResponse.json();
        // ...
      }
    } catch (error) {
      // Error: Handle any exceptions that occur during the sign-in process
      console.error('Google Sign-In Error:', error)
    }
  }

  return (
    <Box style={{ display: 'flex', height: '100vh' }}>
      <LeftContent height='100%' alt='error-illustration' src='/images/pages/AuthLeftContent.png' style={{ flex: 1 }} />
      <Card sx={{ zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ResponsiveCardContent>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Img height='37' alt='error-illustration' src='/images/armergeLogo.svg' />
          </Box>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5, fontSize: '30px' }}>
              Create Account
            </Typography>
          </Box>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={signUpSchema}>
            {({ errors, touched, values, dirty, isValid, handleChange, handleBlur }) => (
              <Form className='row'>
                <TextField autoFocus fullWidth name='firstName' label='First Name' />
                <TextField autoFocus fullWidth name='lastName' label='Last Name' />
                <TextField fullWidth type='email' name='email' label='Email' />
                <PasswordField name='password' label='Password' />
                <PasswordField name='confirmPassword' label='Confirm Password' />
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Fragment>
                      <span>I agree to </span>
                      <Link href='/' passHref>
                        <LinkStyled onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                          all Terms & Conditions
                        </LinkStyled>
                      </Link>
                    </Fragment>
                  }
                />
                <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 7 }}>
                  Sign up
                </Button>
              </Form>
            )}
          </Formik>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography variant='body2' sx={{ marginRight: 2 }}>
              Already have an account?
            </Typography>
            <Typography variant='body2'>
              <Link passHref href='/auth/login'>
                <LinkStyled>Sign in instead</LinkStyled>
              </Link>
            </Typography>
          </Box>
          {/* <Divider sx={{ my: 5 }}>or</Divider> */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Facebook sx={{ color: '#497ce2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Twitter sx={{ color: '#1da1f2' }} />
                </IconButton>
              </Link>*/}
             {/* <Link href='/' passHref>
              <Button
                fullWidth
                size='large'
                variant='contained'
                // onClick={(e: MouseEvent<HTMLElement>) => handleGoogleSignIn()}
                sx={{ height: '40px', backgroundColor: 'white' }}
              >
                <Img height='15' alt='error-illustration' src='/icons/googleIcon.svg' />
                <Typography variant='body2' sx={{ fontWeight: 700, marginLeft: 1.5, fontSize: '15px' }}>
                  Sign up with Google
                </Typography>
              </Button>
            </Link> */}
            {/* <Link href='/' passHref>
               <Button fullWidth size='large'  variant='contained' onClick={(e: MouseEvent<HTMLElement>) => handleGoogleSignIn()} sx={{height:"40px"}}>

            <Img height='15' alt='error-illustration' src='/icons/googleIcon.svg' /> 
             <Typography variant='h8' >
               Sign up with Google
            </Typography>
                    </Button>
                  </Link> */}
          </Box>
        </ResponsiveCardContent>
      </Card>
      <FooterIllustrationsV1 image1=' ' image2=' ' />
    </Box>
  )
}

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
