import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
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
      },
      title: {
            display: 'none'
      },

      sectionDesktop: {
            display: 'none'
      },
      sectionMobile: {
            display: 'flex'
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