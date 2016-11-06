import React from 'react';
import io from 'socket.io-client';

let socket;

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      sent: false,
      nextTurn: 0,
      mvp: [
        {
          url: 'https://www.google.com.mx/maps/dir/FARMACIAS+DEL+AHORRO+PLUS/\'\'/@25.6429442,-100.3250485,16.27z/data=!4m13!4m12!1m5!1m1!1s0x0:0x34ebcf2642b6909f!2m2!1d-100.3159408!2d25.6375522!1m5!1m1!1s0x0:0xf514963a4fc7c14c!2m2!1d-100.323591!2d25.646729?hl=es',
          name: 'Farmacias del Ahorro Plus',
          eta: '5 a 15 Minutos'
        },
        {
          url: 'https://www.google.com.mx/maps/dir/\'\'/Farmacias+del+Ahorro/25.6365466,-100.3345384/@25.6491244,-100.3439726,14.65z/data=!4m15!4m14!1m5!1m1!1s0x0:0xf514963a4fc7c14c!2m2!1d-100.323591!2d25.646729!1m5!1m1!1s0x0:0xfd9ad01ebe301104!2m2!1d-100.3397532!2d25.6506255!1m0!3e0?hl=es',
          name: 'Farmacas del Ahorro San Agustín',
          eta: '11 a 21 Minutos'
        }
      ]
    };
  }

  componentWillMount() {
    socket = io();
    socket.on('connect', () => {
      console.info('Connected to websocket server');
    });
  }

  componentDidMount() {
    window.places({
      container: this.refs['address-input'],
      countries: ['mx'],
      language: 'es'
    });
  }

  onAddProduct(e) {
    e.preventDefault();
    let product = this.refs['product-name'].value;
    if (!product) return;
    this.state.products.push(product);
    this.setState({ products: this.state.products });
    this.refs['product-name'].value = '';
  }

  handleDelete(index) {
    let { products } = this.state;
    products.splice(index, 1);
    this.setState({ products });
  }

  handleOrderSend() {
    let orderPlacement = {
      id: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
      products: this.state.products,
      sucursal: this.state.mvp[this.state.nextTurn],
      contact: {
        name: this.refs.name.value,
        phone: this.refs.phone.value,
        email: this.refs.email.value
      }
    };

    socket.emit('order:placement', orderPlacement);
    this.setState({
      sent: true,
      products: [],
      contact: {},
      nextTurn: this.state.nextTurn + 1
    });
    setTimeout(() => {
      this.setState({ sent: false });
    }, 8000);
  }

  render() {
    return (
      <div>
        <div className='header'>
          <div className='container'>
            <img src='/resources/img/logo.png' className='logo' />
            <h1>Sistema de Asignación de Pedidos</h1>
          </div>
        </div>

        <div className='container'>

          { this.state.sent ? (
            <div className='notification notification-success'>
              <strong>La orden ha sido enviada exitosamente!</strong>
              Tiempo de espera calculado: { this.state.mvp[this.state.nextTurn-1].eta }.
            </div>
          ) : null }

          <div className='row'>

            <div className='col-md-6'>
              <h3>Información de Pedido</h3>
              <div className='paper'>
                <label>Número de Cliente</label>
                <input type='text' placeholder='(00) 0000 0000' />

                <label>Dirección de entrega</label>
                <input type='search' id='address-input' placeholder='Ubicación de entrega...' ref='address-input'  />
                <br />
                <label>Contacto</label>
                <input type='text' ref='name' placeholder='Nombre' />
                <input type='text' ref='phone' placeholder='Teléfono' />
                <input type='text' ref='email' placeholder='Correo' />
              </div>
            </div>

            <div className='col-md-6'>
              <h3>Artículos</h3>
              <div className='paper'>
                <label>ID o Nombre</label>
                <form onSubmit={ ::this.onAddProduct }>
                  <input type='text' placeholder='XX-XXXXX-XXX' ref='product-name' />
                </form>

                <div className='separator' />

                { this.state.products.map((product, $index) => (
                  <div key={ product } className='product'>
                    <p>{ product }</p>
                    <img onClick={ this.handleDelete.bind(this, $index) } src='/resources/icon/delete.svg' />
                  </div>
                )) }

              </div>
              { this.state.products.length ? (
                <button className='btn btn-primary' onClick={ ::this.handleOrderSend }>Enviar Pedido</button>
              ) : null }
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Main;
