// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
// import {PeopleAltIcon,ProductionQuantityLimitsIcon} from '@mui/icons-material';
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import { ShoppingCartOutlined,Publish,ListAltOutlined } from '@mui/icons-material'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    // {
    //   title: 'Team Management',
    //   icon: ManageAccountsIcon,
    //   path: '/team-management'
    // },
    {
      title: 'Product Listing',
      icon: ListAltOutlined,
      path: '/ProductListings'
    },
//    {
//   title: 'My Orders',
//   icon: ShoppingCartOutlined,
//   path: '/orders',
// },
//  {
//   title: 'Ready to Publish',
//   icon: Publish,
//   path: '/publish',
// },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
