// ** Re act Impo rts
import { useState, Fragment, ChangeEvent, MouseEvent, ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'
import Router from 'next/router';

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
import Toast from 'src/common/Toast/Toast';
import { signUpSchema } from 'src/helpers/validations/signUpSchema'
import { Formik, Form } from 'formik';
import { ApiCallPost } from 'src/common/ApiCall';

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


const RegisterPage = () => {
  // ** States
  // const [showPassword, setShowPassword] = useState<Boolean>(false)
  // const [showConfirmPassword, setShowConfirmPassword] = useState<Boolean>(false)

  const initialValues: State = {
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
  };

  // ** Hook
  const theme = useTheme()

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const onSubmit = async (values: State, { resetForm }) => {
    delete values.confirmPassword;
    try {
      const result = await ApiCallPost('user/sign-up', values);

      if (result?.status === 201) {
        resetForm()
        Toast("Registered Successfully", "success");
        Router.push('/auth/login');
      }
    } catch (error) {
      resetForm()
      console.log(error, "error")
      Toast(error.message, "error");
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Img height='37' alt='error-illustration' src='/images/armergeLogo.svg' />
          </Box>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5, fontSize: '30px' }}>
              Create Account
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={signUpSchema}>
            {({ errors, touched, values, dirty, isValid, handleChange, handleBlur }) => (


              <Form className="row">
                <TextField autoFocus fullWidth name='firstName' label='First Name' />
                <TextField autoFocus fullWidth name='lastName' label='Last Name' />
                <TextField fullWidth type='email' name='email' label='Email' />
                <PasswordField fullWidth name='password' label='Password' />
                <PasswordField fullWidth name='confirmPassword' label='Confirm Password' />
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
                    <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                      <Google sx={{ color: '#db4437' }} />
                    </IconButton>
                  </Link>
                </Box>
              </Form>

            )}
          </Formik>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 image1=" " image2=" " />
    </Box>
  )
}

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
