import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { match } from 'react-router';
import { Router } from 'express';
import Layout from '../components/Layout';
import routes from '../../client/router';

const RenderController = Router()

/**
 * Renders the react application to the matching route
 */
.get('*', (req, res, next) => {
  let data = { routes, location: req.url };

  // Match the requested route with react-router
  match(data, (err, redirect, renderProps) => {

    // Send error message if there was a routing error
    if (err) return res.status(500).send(err.message);

    // Redirect the client if we must
    if (redirect) {
      return res.redirect(302, redirect.pathname + redirect.search);
    }

    // If we have a matching route
    if (renderProps) {
      return res.status(200).send(renderToStaticMarkup(<Layout req={ req } />));
    }

    // Failed to find matching route
    next();

  });

});

export default RenderController;
