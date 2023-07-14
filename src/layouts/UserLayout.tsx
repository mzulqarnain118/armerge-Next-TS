import React, { useState, useLayoutEffect, useEffect } from 'react'
import { ReactNode } from 'react'
import Router, { useRouter } from 'next/router'
import { Box, Alert, Snackbar, Button, Typography } from '@mui/material'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import VerticalLayout from 'src/@core/layouts/VerticalLayout'
import VerticalNavItems from 'src/navigation/vertical'
import UpgradeToProButton from './components/UpgradeToProButton'
import VerticalAppBarContent from './components/vertical/AppBarContent'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Common Components Import
import Toast from 'src/common/Toast/Toast'
import { ApiCallPost } from 'src/common/ApiCall'
import { AL, getLocal, setLocal, rmLocal } from 'src/helpers'
import { LoaderSpinner } from 'src/common/Spinner'
import withAuth from 'src/pages/withAuth'

interface Props {
  children: ReactNode
}

const UserLayout = ({ children }: Props) => {
  const { settings, saveSettings } = useSettings()
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const [navOpen, setNavOpen] = useState(false)
  const [isLoading, setIsLoading] = useState<Boolean>(!getLocal('loggedIn'))
  const [isHideSuccessBar, setIsHideSuccessBar] = useState<Boolean>(false)
  const [isEmailVerified, setIsEmailVerified] = useState<Boolean>(false)

  useEffect( () => {
    if (isLoading) {
      setLocal('loggedIn', false)
      rmLocal('token')
      rmLocal('refreshToken')
      window.location.assign('/auth/login')
      setIsLoading(false)
    }
    setIsEmailVerified(getLocal('isEmailVerified'))
    setIsHideSuccessBar(getLocal('hideSuccessBar'))
  }, [isLoading])

  useEffect(() => { isEmailVerified && !isHideSuccessBar && setTimeout(() => {
    hideSuccessBar()
  }, 30000);
}, [isHideSuccessBar,isEmailVerified])

  const toggleNavVisibility = () => {
    setNavOpen(!navOpen)
  }
  const sendVerificationEmail = async () => {
    try {
      const result = await ApiCallPost(`user/verify-email`, { email: localStorage.getItem('email') })

      if (result?.status === 201) {
        Toast('Email Sent to your registered email', 'success')
      }
    } catch (error) {
      console.log(error, 'error')
      Toast(error.message, 'error')
    }
  }
  const hideSuccessBar = async () => {
    try {
      const result = await ApiCallPost(`user/hideSuccessBar`, { email: localStorage.getItem('email') })
      if (result?.status === 201) {
        setIsHideSuccessBar(true)
        setLocal('hideSuccessBar', true)
      }
    } catch (error) {
      console.log(error, 'error')
      Toast(error.message, 'error')
    }
  }
  const UpgradeToProImg = () => {
    return (
      <Box sx={{ mx: 'auto' }}>
        <a
          target='_blank'
          rel='noreferrer'
          href='https://themeselection.com/products/materio-mui-react-nextjs-admin-template/'
        >
          <img width={230} alt='upgrade to premium' src={`/images/misc/upgrade-banner-${settings.mode}.png`} />
        </a>
      </Box>
    )
  }

  return (
     <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {!isEmailVerified ? (
            <Alert sx={{ borderRadius: 0, zIndex: 9999, position: 'sticky' }} severity="error" variant='filled'>
              We need to verify your email address by clicking the link we sent.{' '}
              <span
                onClick={() => sendVerificationEmail()}
                style={{
                  fontWeight: 'bold', // Make the text bold
                  color: 'white', // Set the text color to white
                  cursor: 'pointer' // Make the text cursor pointer
                }}
              >
                Send It Again
              </span>
            </Alert>
          ) : !getLocal('hideSuccessBar') ? (
            <Alert
              variant='filled'
              severity="success"
              sx={{ borderRadius: 0, zIndex: 9999, position: 'sticky' }}
            >
              Your email address has been successfully verified.
            </Alert>
          ) : null}

          {/* <div className={!isEmailVerified && 'disabled'}> */}
          <VerticalLayout
            hidden={!navOpen && hidden}
            settings={settings}
            saveSettings={saveSettings}
            verticalNavItems={VerticalNavItems()}
            verticalAppBarContent={props => (
              <VerticalAppBarContent
                hidden={hidden}
                settings={settings}
                saveSettings={saveSettings}
                toggleNavVisibility={toggleNavVisibility}
              ></VerticalAppBarContent>
            )}
          >
            {children}
            {/* <UpgradeToProButton /> */}
          </VerticalLayout>
          {/* </div> */}
        </Box>
  )
}

export default UserLayout
// export default withAuth(UserLayout)
