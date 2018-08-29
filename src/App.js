import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
  Divider,
  Grid,
  Icon,
  Menu
} from 'semantic-ui-react';
import { Home } from './Home';
import { Help } from './Help';
import { Workspace, WorkspaceControls } from './Project';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>

          <Grid padded id='AppGrid'>
            <Grid.Row id='AppGridRowWorkspace'>
              <Grid.Column width='13' id='AppGridColumnWorkspace'>
                <Route exact path='/' component={Home} />
                <Route exact path='/project/tags' component={WorkspaceControls} />
                <Route exact path='/project/tables' component={WorkspaceControls} />
                <Route exact path='/project/templates' component={WorkspaceControls} />
                <Route exact path='/project/hexes' component={WorkspaceControls} />
                <Route exact path='/project/books' component={Workspace} />
              </Grid.Column>
              <Grid.Column width='3' stretched id='AppHelp'>
                <Route path='/' component={Help} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Menu borderless compact fixed='left' inverted pointing icon='labeled' vertical>
            <Menu.Item as='a' href='/' id='AppMenuItemHexpop'><Icon name='map marker alternate' />HexPop!</Menu.Item>
            <Divider inverted />
            <Menu.Item as='a' href='/project/tags'><Icon name='tags' />Tags</Menu.Item>
            <Menu.Item as='a' href='/project/tables' active='true'><Icon name='list' />Tables</Menu.Item>
            <Menu.Item as='a' href='/project/templates'><Icon name='puzzle piece' />Templates</Menu.Item>
            <Menu.Item as='a' href='/project/hexes'><Icon name='globe' />Hexes</Menu.Item>
            <Menu.Item as='a' href='/project/books'><Icon name='book' />Books</Menu.Item>
          </Menu>

        </div>
      </Router>
    );
  }
}

export default App;
