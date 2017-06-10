import React, { Component } from 'react';
import { Text, View, Image, Linking, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, PopupMessage, Spinner } from './common';
import { saveVideo, closePopUp } from '../actions';


class VideoDetails extends Component {
  state = { showModal: false };

  onSaveVideoButtonPress() {
    this.setState({ showModal: true });
    this.props.saveVideo(this.props.video);
  }

  onClose() {
    this.setState({ showModal: false });
    this.props.closePopUp();
  }

  renderButton() {
    if(this.props.loading) {
      return <Spinner />;
    }

    return (
      <Button onPress={this.onSaveVideoButtonPress.bind(this)}>
        Save Video
      </Button>
    );
  }

  render() {

    const { artist, description, id, thumb, title } = this.props.video;

    const {
      headerContentStyle,
      headerTextStyle,
      imageStyle
    } = styles;

    return (
      <TouchableWithoutFeedback onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${id}`)}>
        <View>
          <CardSection>
            <Image
              style={styles.imageStyle}
              source={{ uri: thumb }}
            />
          </CardSection>

          <CardSection>
            <View style={styles.headerContentStyle}>
              <Text style={styles.headerTextStyle}>{title}</Text>
              <Text>{artist}</Text>
            </View>
          </CardSection>

          <CardSection>
            {this.renderButton()}
          </CardSection>

          <PopupMessage
            visible={this.state.showModal && this.props.saved}
            onClose={this.onClose.bind(this)}
          >
            Already Saved
          </PopupMessage>

        </View>

      </TouchableWithoutFeedback>
    );
  }
}


const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

mapStateToProps = (state) => {
  return {
    saved: state.search.saved,
    loading: state.search.loading
  }
}

export default connect(mapStateToProps, { saveVideo, closePopUp })(VideoDetails);




















//
