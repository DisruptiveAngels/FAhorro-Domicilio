import React from 'react';
import { root } from 'baobab-react/higher-order';
import state from '../state';

@root(state)
class ApplicationContainer extends React.Component {

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

export default ApplicationContainer;
