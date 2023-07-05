import React, { useState } from 'react'
import { ReactNode } from 'react'
import {Box,Alert,Snackbar,Button, Typography} from '@mui/material'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import VerticalLayout from 'src/@core/layouts/VerticalLayout'
import VerticalNavItems from 'src/navigation/vertical'
import UpgradeToProButton from './components/UpgradeToProButton'
import VerticalAppBarContent from './components/vertical/AppBarContent'
import { useSettings } from 'src/@core/hooks/useSettings'
import zIndex from '@mui/material/styles/zIndex'

interface Props {
  children: ReactNode
}

const UserLayout = ({ children }: Props) => {
  const { settings, saveSettings } = useSettings()
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const [navOpen, setNavOpen] = useState(false)

  const toggleNavVisibility = () => {
    setNavOpen(!navOpen)
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
      <Box sx={{  }}>
 {typeof window !== 'undefined' && window.localStorage && !localStorage.getItem("isEmailVerified")?
        <Alert sx={{borderRadius:0,zIndex: 9999, position: 'sticky'}} onClose={() => alert(1)} severity='error' variant='filled'>
          We need to verify your email address by clicking the link we sent.{' '}
          <span
            onClick={() => alert(2)}
            style={{
              fontWeight: 'bold', // Make the text bold
              color: 'white', // Set the text color to white
              cursor: 'pointer' // Make the text cursor pointer
            }}
          >
            Send It Again
          </span>
        </Alert>
       :<Alert sx={{borderRadius:0,zIndex: 'tooltip', position: 'sticky'}} onClose={() => alert(1)}  variant='filled' severity="success">Your email address has been successfully verified.</Alert>}
</Box>
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
    </Box>
  )
}

export default UserLayout
