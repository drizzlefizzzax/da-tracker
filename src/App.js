import React, {Component} from 'react';
import Layout from './containers/Layout/Layout';
import './App.css';
import posterImage from './poster.png';

class App extends Component {
  render () {
    return (
      <div style={
        {
          "text-align": "center", 
          backgroundImage: `url(${posterImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100vh'
        }
      }>
        <Layout align="center"></Layout>
      </div>
    );
  }
}

export default App;
