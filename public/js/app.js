// import React from 'react';
// import Seed from './seed';
// import ReactDOM from 'react-dom';

class ProductList extends React.Component {

  static generateVoteCount() {
    return Math.floor((Math.random() * 50) + 15);
  }

  static x =     {
      id: 1,
      title: 'Yellow Pail',
      description: 'On-demand sand castle construction expertise.',
      url: '#',
      votes: ProductList.generateVoteCount(),
      submitterAvatarUrl: 'images/avatars/daniel.jpg',
      productImageUrl: 'images/products/image-aqua.png',
    }

  render(){
    const product = ProductList.x;
    return(
      <div className='ui unstackable items'>
        <Product 
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        /> 
      </div>
    );
  }
}

class Product extends React.Component { 
  render(){
    return (
    <div className="item">
       <div className="image">
          <img src={this.props.productImageUrl}/>
       </div>
       <div className='middle aligned content'>
        <div className='header'>
          <a>
            <i className='large caret up icon'/>
            {this.props.votes}
          </a>
        </div>
          <div className='description'>
             <a href={this.props.url}>  {this.props.title} </a>
             <p> {this.props.description} </p>
          </div>
        <div className='extra'>
           <span>Submitted by:</span>
           <img
              className='ui avatar image'
              src={this.props.submitterAvatarUrl}
              />
        </div>
       </div>
    </div>
    );
  }
}


ReactDOM.render(
  <ProductList />, 
  document.getElementById('content')
);