import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import VideoDetails from './VideoDetails';

class SearchResults extends Component {
  renderResults() {
    return this.props.result.map(video =>
      <VideoDetails key={video.key} video={video} />
    );
  }
  render() {
    return (
      this.props.result.length ?
      <ScrollView>
        {this.renderResults()}
      < /ScrollView> :
      <Text>
        No Search Results
      </Text>
    );
  }
}

export default SearchResults;
