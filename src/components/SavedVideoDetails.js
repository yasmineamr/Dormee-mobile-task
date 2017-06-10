import React, { Component } from 'react';
import { Text, View, Image, Linking, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';
import { unsaveVideo } from '../actions';


class SavedVideoDetails extends Component {

  onUnsaveVideoButtonPress() {
    this.props.unsaveVideo(this.props.video.uid);
  }

  render() {
    const { artist, description, id, thumb, title, uid } = this.props.video ;

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
            <Button onPress={this.onUnsaveVideoButtonPress.bind(this)}>
              Unsave Video
            </Button>
          </CardSection>
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

export default connect(null, { unsaveVideo })(SavedVideoDetails);




















//
