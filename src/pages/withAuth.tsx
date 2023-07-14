import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { LoaderSpinner } from 'src/common/Spinner'
import { getLocal } from 'src/helpers'

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter()

    // Check if user is authenticated
    const isAuthenticated = getLocal('loggedIn')

    useEffect(() => {
      if (!isAuthenticated) {
        // Redirect to login page if user is not authenticated
        router.push('auth/login')
      }
    }, [])

    if (isAuthenticated) {
      return <WrappedComponent {...props} />
    }

    // Render loading state or error message if needed
    return <div className='body-overlay'>
    <LoaderSpinner isLoading={true} />
  </div>
  }

  return Wrapper
}

export default withAuth
