// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import Router, { useRouter } from 'next/router'

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
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Common Components Import
import TextField from 'src/common/FormikTextField'
import PasswordField from 'src/common/PasswordField'
import Toast from 'src/common/Toast/Toast'
import { LoginSchema } from 'src/helpers/validations/LoginSchema'
import { Formik, Form } from 'formik'
import { ApiCallPost, ApiCallGetSimple } from 'src/common/ApiCall'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { LeftContent, ResponsiveCardContent } from '../register/[[...storeID]]'

interface State {
  password: string
  email: string
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

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState<State>({
    password: '',
    email: ''
  })
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const router = useRouter()
  const { storeID } = router.query
  console.log(storeID)
  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('storeID', String(storeID))
    }
  }, [storeID])
  // Set the rememberMe state to true if the rememberMe checkbox was previously checked
  useEffect(() => {
    const rememberMeValue = localStorage.getItem('rememberMe') === 'true'
    setRememberMe(rememberMeValue)
  }, [])

  const handleRememberMeChange = e => {
    setRememberMe(e.target.checked)
  }

  const handleGoogleSignIn = async() => {
    try {
    const response = await ApiCallGetSimple('user/login/google')
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
  debugger
  }
  const initialValues: State = {
    password: '',
    email: ''
  }

  const onSubmit = async (values: State, { resetForm }) => {
    try {
      const result = await ApiCallPost('user/login', values)
      if (result?.status === 200) {
        const accessToken = result?.data?.data?.accessToken
        const refreshToken = result?.data?.data?.refreshToken
        const user = result?.data?.data.user
        
        // Set token and user data in localStorage
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

        // Check if "remember me" checkbox is checked
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true')
        }
        Toast('Logged In Successfully', 'success')
        resetForm()
        Router.push('/')
      }
    } catch (error) {
      console.log(error, 'error')
      Toast(error.message, 'error')
    }
  }

  // ** Hook
  const theme = useTheme()

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
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

  return (
    <Box style={{ display: 'flex', height: '100vh' }}>
      <LeftContent height='100%' alt='error-illustration' src='/images/pages/AuthLeftContent.png' style={{ flex: 1 }} />
      <Card sx={{ zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <ResponsiveCardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Img height='37' alt='error-illustration' src='/images/armergeLogo.svg' />
          </Box>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5, fontSize: '30px' }}>
              Welcome Back!
            </Typography>
          </Box>

          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={LoginSchema}>
            {({ errors, touched, values, dirty, isValid, handleChange, handleBlur }) => (
              <Form className='row'>
                <TextField fullWidth type='email' name='email' label='Email' />
                <PasswordField name='password' label='Password' />
                <Box
                  sx={{
                    mb: 4,
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox checked={rememberMe} onChange={handleRememberMeChange} />}
                    label='Remember Me'
                  />
                  <Link passHref href='/auth/forgot-password'>
                    <LinkStyled>Forgot Password?</LinkStyled>
                  </Link>
                </Box>
                <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} type='submit'>
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography variant='body2' sx={{ marginRight: 2 }}>
              Don’t have an Account?
            </Typography>
            <Typography variant='body2'>
              <Link passHref href='/auth/register'>
                <LinkStyled>Create an account</LinkStyled>
              </Link>
            </Typography>
          </Box>
          <Divider sx={{ my: 5 }}>or</Divider>
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
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Github
                    sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : theme.palette.grey[300]) }}
                  />
                </IconButton>
              </Link> */}
            <Link href='/' passHref>
              <Button
                fullWidth
                size='large'
                variant='contained'
                onClick={(e: MouseEvent<HTMLElement>) => handleGoogleSignIn()}
                sx={{ height: '40px', backgroundColor: 'white' }}
              >
                <Img height='15' alt='error-illustration' src='/icons/googleIcon.svg' />
                <Typography variant='body2' sx={{ fontWeight: 700, marginLeft: 1.5, fontSize: '15px' }}>
                  Sign in with Google
                </Typography>
              </Button>
            </Link>
          </Box>
        </ResponsiveCardContent>
      </Card>
      <FooterIllustrationsV1 image1=' ' image2=' ' />
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
