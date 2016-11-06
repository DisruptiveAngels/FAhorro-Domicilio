import Baobab from 'baobab';

/**
 * Baobab State
 *
 * This state will be available to all react components rendered
 * inside the application. Baobab provides decorators that allow
 * specific components to attach to a branch of the tree and to
 * update automatically if anything chagnes that branch.
 *
 * @see https://github.com/Yomguithereal/baobab
 * @see https://github.com/Yomguithereal/baobab-react
 */

// Create a new baobab tree instance
const tree = new Baobab({
  currentUser: null
});

export default tree;
