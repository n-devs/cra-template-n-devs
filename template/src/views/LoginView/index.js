import React from 'react'
// import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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

function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function LoginView(props) {
      const [values, setValues] = React.useState({
            email: '',
            password: '',
            showPassword: false
      });

      const [noti, setNoti] = React.useState({
            open: false,
            msg: ''
      });

      const data = useSelector(state => state.user);

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

            if (data.user.email === values.email) {
                  if (data.user.password === values.password) {
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
                  <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                  >
                        <Grid item xs={12}>
                              <TextField
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
                              <FormControl >
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
                  </Grid>
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
