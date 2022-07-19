import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom'
import { isTokenValid } from '../utils/isTokenValid'
import { useStateValue } from '../state'
import { updateAlert } from '../utils/AlertsUtils'

interface PageType {
  key: number;
  name: string;
  link: string
}

const pages:PageType[] = [{
    key: 0,
    name: 'Home', 
    link: "/"
  }, 
  {
    key: 1,
    name: 'Create Shoe Entry', 
    link: "/createShoe"
  },
  {
    key: 2,
    name: 'Sign in',
    link: '/signin'
  }
]

const btnStyle = {
  padding: "0.5rem 1rem",
  width: "100%",
  textDecoration: "none",
  color: "inherit"
}

const navStyle = {
  textDecoration: "none",
  color: "inherit"
}

const ResponsiveAppBar = () => {
  const navigate = useNavigate()
  const [state, dispatch] = useStateValue()

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch({ type: 'SIGN_OUT' })
    updateAlert(
      {
        alertProps: {
        isLoading: false,
        severityType: 'success',
        message: 'Successfully signed out',
        isActive: true
        },
        dispatchObj: dispatch
    })

    navigate('/signin')
  }

  const getNavButtons = (page:PageType) => {
    if(page.key != 2){
      return (
        <Link to={page.link} style={btnStyle}>
          <Typography textAlign="center" >{page.name}</Typography>
        </Link>
      )
    }
    return(
      isTokenValid().valid ? 
        <Typography textAlign="center" onClick={signOut} sx={{ margin: '0 auto' }}>Sign Out</Typography>
      : 
        <Link to={page.link} style={btnStyle}>
          <Typography textAlign="center">{page.name}</Typography>
        </Link>
    )
  }

  const getPageBtn = (page:PageType) => {
    if(page.key != 2){
      return (
        <Button
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
          key={page.key}
        >
          <Link to={page.link} style={navStyle}>
            <Typography textAlign="center">{page.name}</Typography>
          </Link>
        </Button>
      )
    }
    return (
      isTokenValid().valid ?
        <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={signOut} key={page.key}>
          <Typography textAlign="center">Sign Out</Typography>
        </Button> 
        :
        <Button
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
          key={page.key}
        >
          <Link to={page.link} style={navStyle}>
            <Typography textAlign="center">{page.name}</Typography>
          </Link>
        </Button>
    )
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          { 
            state.user 
              &&
              <>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page.key} onClick={handleCloseNavMenu} sx={{padding: 0}}>
                        { getNavButtons(page) }
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page) => (
                    getPageBtn(page)
                  ))}
                </Box>
              </>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
