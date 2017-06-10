import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Hideo } from 'react-native-textinput-effects';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Card, CardSection, Button, Spinner, Input, Confirm } from './common';
import { textChanged, searchVideo, logout } from '../actions';

class Search extends Component {
  state = { showModal: false };

  onTextChange(text) {
    this.props.textChanged(text);
  }

  onSearchButtonPress() {
    const { text } = this.props;

    this.props.searchVideo({ text });
  }

  onAccept() {
    this.props.logout();
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  renderButton() {
    if(this.props.loading) {
      return <Spinner />;
    }

    return (
      <Button onPress = {this.onSearchButtonPress.bind(this)}>
        Search
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>

        <Hideo
          iconClass={FontAwesome}
          iconName={'search'}
          iconColor={'white'}
          iconBackgroundColor={'#c8c3c3'}
          inputStyle={{ color: '#464949' }}
          placeholder="search here.."
          autoCorrect={false}
          value={this.props.text}
          onChangeText={this.onTextChange.bind(this)}
          onSubmitEditing={this.onSearchButtonPress.bind(this)}
          />

        </CardSection>


        <CardSection style={{ paddingTop: 420 }}  >
          <Button onPress={() => Actions.savedVideos()} >
            Saved Videos
          </Button>
        </CardSection>

        <CardSection>
         <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
           Log Out
         </Button>
       </CardSection>

       <Confirm
         visible={this.state.showModal}
         onAccept={this.onAccept.bind(this)}
         onDecline={this.onDecline.bind(this)}
       >
         Are you sure you want to log out?
       </Confirm>

      </Card>
    );
  }
}

mapStateToProps = (state) => {
  return {
    text: state.search.text,
    loading: state.search.loading
  }
}

export default connect(mapStateToProps, { textChanged, searchVideo, logout })(Search);
