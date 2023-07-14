// ** Re act Impo rts
import { useState,useEffect, Fragment, ChangeEvent, MouseEvent, ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'
import Router,{useRouter} from 'next/router';

// ** MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Common Components Import
import Toast from 'src/common/Toast/Toast';
import { ApiCallPost } from 'src/common/ApiCall';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { getLocal, setLocal } from 'src/helpers';



// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
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


const EmailVerify = () => {
  // ** States
  const [emailVerified, setEmailVerified] = useState<Boolean>(false)
  console.log("🚀 ~ file: [token].tsx:54 ~ EmailVerify ~ emailVerified:", emailVerified)

  // ** Hook
  const theme = useTheme()
 const router = useRouter();
  const { token } =  router.query;

 const validateToken = async () => {
    try {
      const result = await ApiCallPost(`user/verify-email/${token}`,{});

      if (result?.status === 201) {
        setEmailVerified(true);
        Toast("Email Verified", "success");
        setLocal('isEmailVerified',true)
        getLocal('loggedIn')? Router.push('/'):Router.push('/auth/login');
      }
      else {
        getLocal('loggedIn')? Router.push('/') : Router.push('/auth/login');
      }
    } catch (error) {
      console.log(error, "error")
      Toast(error.message, "error");
    }
  }
  useEffect(()=>{
    token && validateToken()
  },[token])

  
  return (
<></>
  )
}

EmailVerify.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default EmailVerify
