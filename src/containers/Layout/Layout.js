import React, { Component } from 'react';
import axios from 'axios';

import Timer from '../../components/Timer/Timer';

class Layout extends Component {
  state = {
    exchangeRate: 1,
    time: 0, // Initialize the time state
    isRunning: false, // Initialize the running state
    hourlyRate: 0
  };

  componentWillUnmount() {
    clearInterval(this.interval); // Ensure interval is cleared when component unmounts
  }

  componentDidMount() {
    axios.get('https://open.er-api.com/v6/latest/USD')
      .then(res => {
        this.setState({ exchangeRate: res.data.rates.GBP });
      });

    // Listen for visibility changes
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }


  // Function to start the timer
  startTimer = () => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
      this.interval = setInterval(() => {
        this.setState((prevState) => ({
          time: prevState.time + 1
        }));
      }, 1000);
    }
  };

  stopTimer = () => {
    clearInterval(this.interval);
    this.setState({ isRunning: false });
  };

  hourlyRateChangeHandler = (event) => {
    if(/^\d*\.?\d*$/.test(event.target.value)) {
        this.setState({ hourlyRate: event.target.value })
    } else {
        alert("numbers only dickhead")
    }
  };

  render() {
    return (
        <div>
                  <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.75)', // Semi-transparent black color
      }} />
      <div style={{ 
        position: 'relative', // Ensure content is positioned relatively
        zIndex: 1, // Ensure content is above the overlay layer
      }}>
        <img src="/logo.png" style={{ width: '35%', height: 'auto', paddingTop: '25px'}} />
        {/*<p>{this.state.exchangeRate}</p> */}
        <br />
        <label htmlFor="hourlyRate">Project Hourly Rate: $</label>
        <input value={this.state.hourlyRate} name="hourlyRate" onChange={this.hourlyRateChangeHandler} />
        <Timer time={this.state.time} />
        {/* Render Start or Stop button based on the running state */}
        <button
            onClick={this.state.isRunning ? this.stopTimer : this.startTimer}
            style={{
              backgroundColor: this.state.isRunning ? 'red' : 'green', // Change color based on state
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '5px',
              cursor: 'pointer',
              margin: '10px',
              transition: 'background-color 0.3s', // Smooth transition for color change
              ...((this.state.hourlyRate > 0) != true && {
                backgroundColor: 'grey',
                cursor: 'not-allowed',
              }),
            }}
            disabled={this.state.hourlyRate > 0 ? false : true}
          >
            {this.state.isRunning ? 'Stop' : 'Start'}
          </button>
        <p>Earnings: £{(((this.state.hourlyRate / 3600) * this.state.time) * this.state.exchangeRate).toFixed(2)}</p>
      </div>
        </div>
    );
  }
}

export default Layout;