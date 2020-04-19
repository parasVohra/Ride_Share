import React, { Component } from 'react';
import { Alert } from 'reactstrap';

//UI Imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
//import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//Redux imports
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions'
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

class Register extends Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    msg: null,
    phone: 1212
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps){
    const { error, isAuthenticated } = this.props;
    if(error !== prevProps.error ){

      //Check for Register error
      if(error.id === 'REGISTER_FAIL'){
        this.setState({ msg: error.msg.msg});
      } else {
        this.setState({ msg: null});
      }
    } 


    // if authenticated empty msg

    if(isAuthenticated){
      this.setState({ msg: null});
    }

  }

  onSubmit = e => {
    e.preventDefault();

    const { firstName, lastName, email, password} = this.state;

    //craete user object
    const newUser = {
      firstName,
      lastName,
      email,
      password
    }

    //attempt to register
    this.props.register(newUser); 
    
  }

  // useStyles() {
  //   makeStyles(theme => ({
  //     paper: {
  //       marginTop: theme.spacing(8),
  //       display: 'flex',
  //       flexDirection: 'column',
  //       alignItems: 'center',
  //     },
  //     avatar: {
  //       margin: theme.spacing(1),
  //       backgroundColor: theme.palette.secondary.main,
  //     },
  //     form: {
  //       width: '100%', // Fix IE 11 issue.
  //       marginTop: theme.spacing(3),
  //     },
  //     submit: {
  //       margin: theme.spacing(3, 0, 2),
  //     },
  //   }));

  //  } 


   //classes = useStyles();

render(){
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div /*className={classes.paper}*/>
        <Avatar /*className={classes.avatar}*/>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        { this.state.msg ? ( <Alert color="danger">{this.state.msg}</Alert>): null }
        <form /**className={classes.form}*/ noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={this.state.firstName}
                onChange={e => this.setState({firstName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={this.state.lastName}
                onChange={e => this.setState({ lastName: e.target.value })}
              />
            </Grid>
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
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
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
  { register, clearErrors  }

)(Register)
