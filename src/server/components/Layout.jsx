import React from 'react';

/**
 * Layout component
 *
 * @desc This is the only component that will render on the server. The client
 * will build the rest of the application inside this body container.
 */
class Layout extends React.Component {

  componentWillMount() {
    const { NODE_ENV } = process.env;

    this.version = global.version;
    this.name = global.name;
    this.prefix = NODE_ENV === 'production' ? '' : `http://${this.props.req.hostname}:8080`;
  }

  render() {
    return (
      <html>
        <head>
          <title>ReactStarter</title>
          <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=no' />
          <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet" />
          {
            process.env.NODE_ENV === 'production'
              ? <link rel='stylesheet' href={ `${this.prefix}/dist/${this.name}-v${this.version}.css` } />
            : null
          }
        </head>
        <body>
          <div id='app' />
          <script type='text/javascript' src={ `${this.prefix}/dist/${this.name}-v${this.version}.js` } />
        </body>
      </html>
    );
  }
}

export default Layout;
