import React, { Component } from 'react';
import './App.css';
import AppRouter from './router';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
    	<div>
      		<AppRouter></AppRouter>
    		<Footer></Footer>
    	</div>
    );
  }
}

export default App;
