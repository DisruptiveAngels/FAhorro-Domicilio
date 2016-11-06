import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// -- Components
import ApplicationContainer from '../components/ApplicationContainer.jsx';
import Home from './Home';

/**
 * Main application router
 *
 * We define the main component that will wrap the entire application
 * and then the child routes that will be held on their respective
 * folders with their child routes located inside in recursive order.
 */

export default (
  <Router history={ browserHistory }>
    <Route path='/' component={ ApplicationContainer }>
      {[ Home ]}
    </Route>
  </Router>
);
