import React from 'react'
// import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {
      useSelector,
      useDispatch
} from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Helmet } from 'react-helmet';
import FirebaseSignIn from '../../components/FirebaseSignIn'

const useStyles = makeStyles((theme) => ({
      root: {
            display: 'flex',
            flexWrap: 'wrap',
      },
      margin: {
            margin: theme.spacing(1),
      },
      withoutLabel: {
            marginTop: theme.spacing(3),
      },
      textField: {
            width: '30ch',
      },
}));


function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function LoginView(props) {
      const classes = useStyles();

      const [values, setValues] = React.useState({
            email: '',
            password: '',
            showPassword: false
      });

      const [noti, setNoti] = React.useState({
            open: false,
            msg: ''
      });

      const user = useSelector(state => state.user);

      const { t } = useTranslation()
      const dispatch = useDispatch();
      const history = useHistory();

      const handleChange = (prop) => (event) => {
            setValues({ ...values, [prop]: event.target.value });
      };

      const handleClickShowPassword = () => {
            setValues({ ...values, showPassword: !values.showPassword });
      };

      const handleMouseDownPassword = (event) => {
            event.preventDefault();
      };

      const handleClickLogIn = () => {

            if (user.email === values.email) {
                  if (user.password === values.password) {
                        dispatch({ type: 'AUTHENTICATED', payload: true });
                        history.push('/')
                  } else {
                        setNoti({
                              open: true,
                              msg: 'password ไม่ถูกต้อง'
                        })
                  }
            } else {
                  setNoti({
                        open: true,
                        msg: 'email ไม่ถูกต้อง'
                  })
            }

      }

      const handleClose = () => {
            setNoti({
                  open: false,
                  msg: ''
            })
      }
      return (
            <React.Fragment>
                  <Helmet>
                        <title>{t('React JS | Login')}</title>
                        <meta name="description" content="Helmet application" />
                  </Helmet>
                  <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                  }}>
                        <Paper style={{
                              padding: 30
                        }}>
                              <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    spacing={2}
                              >
                                    <Typography variant="h5" component="h2">
                                          {t("Login")}
                                    </Typography>
                                    <Grid item xs={12}>
                                          <TextField
                                                className={clsx(classes.margin, classes.textField)}
                                                label="E-mail"
                                                id="email"
                                                value={values.email}
                                                onChange={handleChange('email')}
                                                InputProps={{
                                                      startAdornment: <EmailIcon />,
                                                }}
                                          />
                                    </Grid>
                                    <Grid item xs={12}>
                                          <FormControl className={clsx(classes.margin, classes.textField)} >
                                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                                <Input
                                                      id="standard-adornment-password"
                                                      type={values.showPassword ? 'text' : 'password'}
                                                      value={values.password}
                                                      onChange={handleChange('password')}
                                                      endAdornment={
                                                            <InputAdornment position="end">
                                                                  <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={handleClickShowPassword}
                                                                        onMouseDown={handleMouseDownPassword}
                                                                  >
                                                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                                  </IconButton>
                                                            </InputAdornment>
                                                      }
                                                />
                                          </FormControl>
                                    </Grid> <Grid item xs={12}>
                                          <Button variant="contained" color="primary" onClick={handleClickLogIn}>
                                                {t("Sign In")}
                                          </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                          <FirebaseSignIn></FirebaseSignIn>
                                    </Grid>
                              </Grid>
                        </Paper>
                  </div>
                  <Snackbar open={noti.open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                              {t(`${noti.msg}`)}
                        </Alert>
                  </Snackbar>
            </React.Fragment>
      )
}

// LoginView.propTypes = {

// }

export default LoginView
