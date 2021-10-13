import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { fade, makeStyles } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import MoreIcon from '@mui/icons-material/MoreVert';
import HideOnScroll from './components/HideOnScroll'
import T from '../T'


const useStyles = makeStyles((theme) => ({
      grow: {
            flexGrow: 1,
      },
      menuButton: {
            marginRight: theme.spacing(2),
      },
      title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                  display: 'block',
            },
      },
      search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                  backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                  marginLeft: theme.spacing(3),
                  width: 'auto',
            },
      },
      searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
      },
      inputRoot: {
            color: 'inherit',
      },
      inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                  width: '20ch',
            },
      },
      sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                  display: 'flex',
            },
      },
      sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                  display: 'none',
            },
      },
}));

function HeaderAppBar(props) {
      const classes = useStyles();
      const [anchorEl, setAnchorEl] = React.useState(null);
      const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

      const history = useHistory()
      const auth = useSelector(state => state.auth);
      const dispatch = useDispatch();

      const isMenuOpen = Boolean(anchorEl);
      const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

      const handleProfileMenuOpen = (event) => {
            setAnchorEl(event.currentTarget);
      };

      const handleMenuClose = () => {
            setAnchorEl(null);
      };

      const handleMenuLogout = () => {
            dispatch({ type: 'AUTHENTICATED', payload: false });
            setAnchorEl(null);
      };

      const handleMobileMenuClose = () => {
            setMobileMoreAnchorEl(null);
      };

      const handleMobileMenuOpen = (event) => {
            setMobileMoreAnchorEl(event.currentTarget);
      };

      const menuId = 'primary-search-account-menu';
      const renderMenu = (
            <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  id={menuId}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
            >
                  <MenuItem onClick={handleMenuClose}><T>Profile</T></MenuItem>
                  <MenuItem onClick={handleMenuLogout}><T>Logout</T></MenuItem>
            </Menu>
      );

      const mobileMenuId = 'primary-search-account-menu-mobile';
      const renderMobileMenu = (
            <Menu
                  anchorEl={mobileMoreAnchorEl}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  id={mobileMenuId}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={isMobileMenuOpen}
                  onClose={handleMobileMenuClose}
            >
                  {auth.isAuthenticated === true ? (
                        <div>
                              <MenuItem>
                                    <IconButton aria-label="show 4 new mails" color="inherit">
                                          <Badge badgeContent={4} color="secondary">
                                                <MailIcon />
                                          </Badge>
                                    </IconButton>
                                    <p><T>Messages</T></p>
                              </MenuItem>
                              <MenuItem>
                                    <IconButton aria-label="show 11 new notifications" color="inherit">
                                          <Badge badgeContent={11} color="secondary">
                                                <NotificationsIcon />
                                          </Badge>
                                    </IconButton>
                                    <p><T>Notifications</T></p>
                              </MenuItem>
                              <MenuItem onClick={handleProfileMenuOpen}>
                                    <IconButton
                                          aria-label="account of current user"
                                          aria-controls="primary-search-account-menu"
                                          aria-haspopup="true"
                                          color="inherit"
                                    >
                                          <AccountCircle />
                                    </IconButton>
                                    <p><T>Profile</T></p>
                              </MenuItem>
                        </div>
                  ) : (<div>
                        <MenuItem>
                              <Button color="inherit" onClick={() => {
                                    history.push('/login');
                                    setMobileMoreAnchorEl(null);
                              }}><T>Login</T></Button>
                        </MenuItem>
                        <MenuItem>
                              <Button color="inherit" onClick={() => {
                                    history.push('/register');
                                    setMobileMoreAnchorEl(null);
                              }}><T>Register</T></Button>
                        </MenuItem>
                  </div>)}
            </Menu>
      );

      return (
            <React.Fragment>
                  <CssBaseline />
                  <HideOnScroll {...props}>
                        <AppBar>
                              <Toolbar>
                                    <Button onClick={() => {
                                          history.push('/')
                                    }} >
                                          <Typography className={classes.title} variant="h6" noWrap>
                                                <T>React JS</T>
                                          </Typography>
                                    </Button>
                                    <div className={classes.search}>
                                          <div className={classes.searchIcon}>
                                                <SearchIcon />
                                          </div>
                                          <InputBase
                                                placeholder="Search…"
                                                classes={{
                                                      root: classes.inputRoot,
                                                      input: classes.inputInput,
                                                }}
                                                inputProps={{ 'aria-label': 'search' }}
                                          />
                                    </div>
                                    <div className={classes.grow} />
                                    {auth.isAuthenticated === true ? (
                                          <React.Fragment>
                                                <div className={classes.sectionDesktop}>
                                                      <IconButton aria-label="show 4 new mails" color="inherit">
                                                            <Badge badgeContent={4} color="secondary">
                                                                  <MailIcon />
                                                            </Badge>
                                                      </IconButton>
                                                      <IconButton aria-label="show 17 new notifications" color="inherit">
                                                            <Badge badgeContent={17} color="secondary">
                                                                  <NotificationsIcon />
                                                            </Badge>
                                                      </IconButton>
                                                      <IconButton
                                                            edge="end"
                                                            aria-label="account of current user"
                                                            aria-controls={menuId}
                                                            aria-haspopup="true"
                                                            onClick={handleProfileMenuOpen}
                                                            color="inherit"
                                                      >
                                                            <AccountCircle />
                                                      </IconButton>
                                                </div>
                                                <div className={classes.sectionMobile}>
                                                      <IconButton
                                                            aria-label="show more"
                                                            aria-controls={mobileMenuId}
                                                            aria-haspopup="true"
                                                            onClick={handleMobileMenuOpen}
                                                            color="inherit"
                                                      >
                                                            <MoreIcon />
                                                      </IconButton>
                                                </div>

                                          </React.Fragment>
                                    ) : (
                                          <React.Fragment>
                                                <div className={classes.sectionDesktop}>
                                                      <Button color="inherit" onClick={() => { history.push('/login') }}><T>Login</T></Button>
                                                      <Button color="inherit" onClick={() => { history.push('/register') }}><T>Register</T></Button>
                                                </div>
                                                <div className={classes.sectionMobile}>
                                                      <IconButton
                                                            aria-label="show more"
                                                            aria-controls={mobileMenuId}
                                                            aria-haspopup="true"
                                                            onClick={handleMobileMenuOpen}
                                                            color="inherit"
                                                      >
                                                            <MoreIcon />
                                                      </IconButton>
                                                </div>
                                          </React.Fragment>
                                    )}
                              </Toolbar>
                        </AppBar>

                  </HideOnScroll>
                  {renderMenu}
                  {renderMobileMenu}
                  <Toolbar />
                  <Container style={{
                        height: '100%'
                  }}>
                        <Box my={2} style={{
                              height: '100%'
                        }}>
                              {props.children}
                        </Box>
                  </Container>
            </React.Fragment>
      );
}


HeaderAppBar.propTypes = {
      children: PropTypes.element.isRequired,
};

export default HeaderAppBar