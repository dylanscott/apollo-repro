import React, { Component } from 'react';
import classNames from 'classnames'

import './App.css';

import List from './List'

class App extends Component {
  state = {
    selected: 'odds',
  };

  render() {
    const { selected } = this.state
    return <div>
      <div className='tab-selector'>
        <a href onClick={this.select('odds')} 
          className={classNames({ active: selected === 'odds' })}>
          odds
        </a>
        {' '}
        <a href onClick={this.select('evens')} 
          className={classNames({ active: selected === 'evens' })}>
          evens
        </a>
      </div>

      <List type='odds'
        className={classNames({ hidden: selected !== 'odds' })} />
      <List type='evens'
        className={classNames({ hidden: selected !== 'evens' })} />
    </div>;
  }

  select(type) {
    return (e) => {
      e.preventDefault();
      this.setState({ selected: type });
    }
  }
}

export default App;