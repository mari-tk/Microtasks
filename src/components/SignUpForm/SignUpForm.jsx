import React, { Component } from 'react'
import { signUp } from '../../utilities/users-service';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

//remake class component to functional component
export default class SignUpForm extends Component {

  // state is always an object with a property for each "piece" of state
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // We don't want to send the 'error' or 'confirm' property,
      //  so let's make a copy of the state object, then delete them
      const formData = {...this.state}
      delete formData.error;
      delete formData.confirm;
      const user = await signUp(formData)
      this.props.setUser(user)
    } catch (e) {
      console.log(e);
      this.setState({ error: 'Sign Up Failed - Try Again'})
    }
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value, error: '' })
  }



  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Name"
              autoComplete='off'
              name="name"
              autoFocus
              value={this.state.name}
              onChange={this.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete='off'
              name="email"
              autoFocus
              value={this.state.email}
              onChange={this.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              autoComplete='off'
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm"
              label="Confirm Password"
              autoComplete='off'
              type="password"
              id="password"
              value={this.state.confirm}
              onChange={this.handleChange}
            />
            <Button
              disabled={disable}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            {/* <p className="error-message">&nbsp;{this.state.error}</p> */}
          </Box>
      </Box>
      </>
    );
  }
}

