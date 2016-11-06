import ReactDOM from 'react-dom';
import router from './router';

/**
 * Client entry poiint.
 */

// Render the react-router result to the target node
const node = document.getElementById('app');
ReactDOM.render(router, node);
