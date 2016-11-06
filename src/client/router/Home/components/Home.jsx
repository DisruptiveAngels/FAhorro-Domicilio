import React from 'react';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
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
          <div className='row'>

            <div className='col-md-6'>
              <h3>Asignar Pedido</h3>
              <div className='paper'>
                <label>Número de Cliente</label>
                <input type='text' placeholder='(00) 0000 0000' />

                <label>Dirección de entrega</label>
                <input type='search' id='address-input' placeholder='Ubicación de entrega...' ref='address-input'  />
                <br />
                <label>Contacto</label>
                <input type='text' placeholder='Nombre' />
                <input type='text' placeholder='Teléfono' />
                <input type='text' placeholder='Correo' />
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
