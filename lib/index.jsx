import React, { Component } from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import axios from 'axios';

export class RegistrationManager extends Component {
  state = {
    registrations: [],
    name: '',
    description: '',
    selectedRegistration: null
  };

  componentDidMount() {
    this.fetchRegistrations();
  }

  fetchRegistrations = () => {
    axios.get('/registrations')
      .then(response => {
        this.setState({ registrations: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  };

  createRegistration = () => {
    const { name, description } = this.state;

    axios.post('/registrations', { name, description })
      .then(response => {
        this.fetchRegistrations();
        this.setState({ name: '', description: '' });
      })
      .catch(error => {
        console.error(error);
      });
  };

  useRegistration = (registration) => {
    this.setState({ selectedRegistration: registration });
    // Perform additional actions to use the selected registration
  };

  render() {
    const { registrations, name, description, selectedRegistration } = this.state;
    const videos = [];
    for(let i=0; i < 1; i++){
      videos.push(`/videos/registrations/registration${i}.mp4`);
    }
    return(
      <div className="registration-manager-container">
        <VideoCarousel videos={videos}/>
      </div>
    )
  }
}



class VideoCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  goToPrevious = () => {
    const { currentIndex } = this.state;
    const { videos } = this.props;
    const lastIndex = videos.length - 1;
    const newIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    this.setState({ currentIndex: newIndex });
  };

  goToNext = () => {
    const { currentIndex } = this.state;
    const { videos } = this.props;
    const lastIndex = videos.length - 1;
    const newIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    this.setState({ currentIndex: newIndex });
  };

  render() {
    const { currentIndex } = this.state;
    const { videos } = this.props;
    const currentVideo = videos[currentIndex];

    return (
      <div>
        <video src={currentVideo} className="background-video" autoPlay loop/>
        <button onClick={this.goToPrevious}>Previous</button>
        <button onClick={this.goToNext}>Next</button>
      </div>
    );
  }
}


