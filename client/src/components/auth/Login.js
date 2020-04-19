import React, { Component } from 'react';
import { Alert } from 'reactstrap';

//UI Imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

//Redux imports
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Ryyd
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class Login extends Component {

  state = {
    email: '',
    password: '',
    msg: null,
    phone: 1212
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps){
    const { error, isAuthenticated } = this.props;
    if(error !== prevProps.error ){

      //Check for Register error
      if(error.id === 'LOGIN_FAIL'){
        this.setState({ msg: error.msg.msg});
      } else {
        this.setState({ msg: null});
      }
    }
    if(isAuthenticated){
      this.setState({ msg: null});
    } 

  }

  onSubmit = e => {
    e.preventDefault();

    const { email, password} = this.state;
    const user ={
      email,
      password
    }

    this.props.login(user)
    
  }

render(){
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div /*className={classes.paper}*/>
        <Avatar /*className={classes.avatar}*/>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Login
        </Typography>
        { this.state.msg ? ( <Alert color="danger">{this.state.msg}</Alert>): null }
        <form /**className={classes.form}*/ noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={this.state.email}
                onChange={e => this.setState({email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.onSubmit}
            //className={classes.submit}
          >
            Login
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );

}

  
}

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error

});

export default connect(
  mapStateToProps,
  { login, clearErrors  }

)(Login)
