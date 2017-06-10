import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {

  onEmailChange(email) {
    this.props.emailChanged(email);
  }

  onPasswordChange(password) {
    this.props.passwordChanged(password);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderButton() {
    if(this.props.loading) {
      return <Spinner />;
    }

    return (
      <Button onPress = {this.onButtonPress.bind(this)}>
      LOGIN
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="user@domain.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Text style={styles.passwordStyle}>
            Password must be at least 6 characters
          </Text>
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  passwordStyle: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'blue'
  }
};

mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  }
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
