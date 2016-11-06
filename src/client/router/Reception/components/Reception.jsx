import React from 'react';
import io from 'socket.io-client';

class Reception extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: [],
      finalizing: false
    };
  }

  componentWillMount() {
    let socket = io();

    // Listen to order placements
    socket.on('order:placement', (order) => {
      this.state.orders.push(order);
      this.setState({ orders: this.state.orders });
    });
  }

  startFinalizing(url) {
    this.setState({ finalizing: true });
    window.open(url);
  }

  endFinalizing() {
    this.state.orders.splice(0, 1);
    this.setState({ orders: this.state.orders });
    this.setState({ finalizing: false });
  }

  render() {
    return (
      <div>
        <div className='header reception'>
          <div className='container'>
            <h1>Sistema de Recepción de Pedidos</h1>
          </div>
        </div>

        <div className='container'>
          <div className='row'>
            { this.state.orders.map((order, $index) => (
              <div className='col-md-4' key={ $index }>
                <div className='product alert'>
                  <p key='contact-info'>#{ order.id } - { order.contact.name } ({ order.contact.email }) - { order.contact.phone }</p>
                  <p key='pickup' className='moto'>Recoger producto: { order.sucursal.name }</p>
                  <ul>
                    { order.products.map((product, $index) => (
                      <li key={ $index }>{ product }</li>
                    )) }
                  </ul>
                  { this.state.finalizing ? (
                    <a key='finalize' onClick={ ::this.endFinalizing } className='finalize'>Finalizar</a>
                    ) : (
                    <a key='navigate' onClick={ ::this.startFinalizing.bind(this, order.sucursal.url) }>Navegar</a>
                  ) }
                </div>
              </div>
            )) }
          </div>
        </div>

        <img src='/resources/img/logo.png' className='footer' />
      </div>
    );
  }

}

export default Reception;
