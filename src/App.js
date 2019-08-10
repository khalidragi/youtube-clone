import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import youtube from './api/youtube';
import { SearchBar, VideoDetail, VideoList } from './components';

class App extends Component {
  state = {
    videos: [],
    selectedVideo: null
  };

  firstLoad = async () => {
    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: process.env.REACT_APP_API_KEY,
        chart: 'mostPopular',
        regionCode: 'US'
      }
    });
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0]
    });
  };

  onVideoSelect = video => {
    this.setState({ selectedVideo: video });
  };

  handleSubmit = async searchTerm => {
    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: process.env.REACT_APP_API_KEY,
        q: searchTerm
      }
    });
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0]
    });
  };

  componentDidMount() {
    this.firstLoad();
  }

  render() {
    return (
      <Grid
        justify='center'
        container
        spacing={10}
        style={{ backgroundColor: '#212121' }}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={1}>
              <img
                src='https://9to5google.com/2017/08/30/new-youtube-kids-logo/youtube-kids-new-logo/'
                style={{ height: '85px' }}
                alt='logo'
              />
            </Grid>
            <Grid item xs={7}>
              <SearchBar onFormSubmit={this.handleSubmit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={this.state.selectedVideo} />
            </Grid>
            <Grid item xs={4}>
              <VideoList
                videos={this.state.videos}
                onVideoSelect={this.onVideoSelect}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default App;
