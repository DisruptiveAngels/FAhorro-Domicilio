import io from 'socket.io';

/**
 * Socket.IO Module
 * @type {Object}
 */
const socketio = {

  /**
   * Initialize a socket.io websocket server on a http server instance
   * @param {Object} server Node http's server instance
   */
  init(server) {
    this.server = io(server);
    this.server.on('connection', (socket) => {
      socketio.bindEvents(socket);
    });
  },

  /**
   * Bind all the events related to socket.io
   */
  bindEvents(socket) {
    socket.on('order:placement', (order) => {
      socket.broadcast.emit('order:placement', order);
    });
  }

};

export default socketio;
