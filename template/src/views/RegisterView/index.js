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
      // useSelector, 
      useDispatch
} from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function RegisterView(props) {
      const [values, setValues] = React.useState({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            showPassword: false,
            showConfirmPassword: false
      });

      const { t } = useTranslation()
      const dispatch = useDispatch();
      const history = useHistory();

      const handleChange = (prop) => (event) => {
            setValues({ ...values, [prop]: event.target.value });
      };

      const handleClickShowPassword = () => {
            setValues({ ...values, showPassword: !values.showPassword });
      };

      const handleClickConfirmShowPassword = () => {
            setValues({ ...values, showConfirmPassword: !values.showPassword });
      };

      const handleMouseDownPassword = (event) => {
            event.preventDefault();
      };

      const handleClickRegister = () => {
            dispatch({ type: 'USER', payload: { ...values, ["id"]: Math.random().toString(36).substr(2, 9) } });
            history.push('/')
      }

      const
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
                                    label="Username"
                                    id="username"
                                    value={values.username}
                                    onChange={handleChange('username')}
                                    InputProps={{
                                          startAdornment: <AccountCircleIcon />,
                                    }}
                              />
                        </Grid>
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
                        </Grid>
                        <Grid item xs={12}>
                              <FormControl >
                                    <InputLabel htmlFor="standard-adornment-confirm-password">Confirm Password</InputLabel>
                                    <Input
                                          id="standard-adornment-confirm-password"
                                          type={values.showConfirmPassword ? 'text' : 'password'}
                                          value={values.password}
                                          onChange={handleChange('confirmPassword')}
                                          endAdornment={
                                                <InputAdornment position="end">
                                                      <IconButton
                                                            aria-label="toggle confirm password visibility"
                                                            onClick={handleClickConfirmShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                      >
                                                            {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                      </IconButton>
                                                </InputAdornment>
                                          }
                                    />
                              </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                              <Button variant="contained" color="primary" onClick={handleClickRegister}>
                                    {t("Sign Up")}
                              </Button>
                        </Grid>
                  </Grid>
            </React.Fragment>
      )
}

// RegisterView.propTypes = {

// }

export default RegisterView
