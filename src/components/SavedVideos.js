import _ from 'lodash';
import React, { Component } from 'react';
import { Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import { savedVideos } from '../actions';
import SavedVideoDetails from './SavedVideoDetails';


class SavedVideos extends Component {
  componentWillMount() {
    this.props.savedVideos();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ savedVideosList }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(savedVideosList);
  }

  renderRow(video) {
    return <SavedVideoDetails video={video} />;
  }

  renderSavedVideos() {
    return this.props.savedVideosList.map(video => {
      <SavedVideoDetails key={video.key} video={video} /> }
    );
  }

  render() {
    return (

      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = (state) => {

  const savedVideos = _.map(state.search.savedVideos, (val, uid) => {
    return { ...val, uid };
  });
  return { savedVideosList: savedVideos };
}

export default connect(mapStateToProps, { savedVideos })(SavedVideos);
