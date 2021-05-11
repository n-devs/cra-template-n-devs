import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';

function HideOnScroll(props) {
      const { children, window } = props;
      // Note that you normally won't need to set the window ref as useScrollTrigger
      // will default to window.
      // This is only being set here because the demo is in an iframe.
      const trigger = useScrollTrigger({ target: window ? window() : undefined });

      return (
            <Slide appear={false} direction="down" in={!trigger}>
                  {children}
            </Slide>
      );
}

HideOnScroll.propTypes = {
      children: PropTypes.element.isRequired,
      /**
       * Injected by the documentation to work in an iframe.
       * You won't need it on your project.
       */
      window: PropTypes.func,
};

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

export default function HeaderAppBar(props) {
      const classes = useStyles();
      const [anchorEl, setAnchorEl] = React.useState(null);

      const { t } = useTranslation()
      const fakeAuth = useSelector(state => state.auth);
      const dispatch = useDispatch();

      const isMenuOpen = Boolean(anchorEl);

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
                  <MenuItem onClick={handleMenuClose}>{t("Profile")}</MenuItem>
                  <MenuItem onClick={handleMenuLogout}>{t("Logout")}</MenuItem>
            </Menu>
      );

      return (
            <React.Fragment>
                  <CssBaseline />
                  <HideOnScroll {...props}>
                        <AppBar>
                              <Toolbar>
                                    <IconButton
                                          edge="start"
                                          className={classes.menuButton}
                                          color="inherit"
                                          aria-label="open drawer"
                                    >
                                          <MenuIcon />
                                    </IconButton>
                                    <Typography className={classes.title} variant="h6" noWrap>
                                          {t("React JS")}
                                    </Typography>
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
                                    {fakeAuth.isAuthenticated === true ? (
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
                                    ):(
                                          <div className={classes.sectionDesktop}>
                                                <Button color="inherit" href="/login">{t("Login")}</Button>
                                                <Button color="inherit" href="/register">{t("Register")}</Button>
                                          </div>
                                    )}
                              </Toolbar>
                        </AppBar>
                        {renderMenu}
                  </HideOnScroll>
                  <Toolbar />
                  <Container>
                        <Box my={2}>
                              {props.children}
                        </Box>
                  </Container>
            </React.Fragment>
      );
}

HeaderAppBar.propTypes = {
      children: PropTypes.element.isRequired,
};