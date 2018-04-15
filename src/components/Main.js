import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../redux/reducers';

import Header from '../components/Header';
import Ideas from '../components/Ideas';

var store = createStore(reducers);

const Main = (props) => {
  return (
      <Provider store={store}>
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
              <div>
                  <Header/>
                  <Ideas/>
              </div>
          </MuiThemeProvider>
      </Provider>
  );
};

export default Main;