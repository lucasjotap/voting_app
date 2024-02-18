// import React from 'react';
// import Seed from './seed';
// import ReactDOM from 'react-dom';

class ProductList extends React.Component {

  static generateVoteCount() {
    return Math.floor((Math.random() * 50) + 15);
  }

  static products =  [{
      id: 1,
      title: 'Yellow Pail',
      description: 'On-demand sand castle construction expertise.',
      url: '#',
      votes: ProductList.generateVoteCount(),
      submitterAvatarUrl: 'images/avatars/daniel.jpg',
      productImageUrl: 'images/products/image-aqua.png',
    },
    {
      id: 2,
      title: 'Supermajority: The Fantasy Congress League',
      description: 'Earn points when your favorite politicians pass legislation.',
      url: '#',
      votes: ProductList.generateVoteCount(),
      submitterAvatarUrl: 'images/avatars/kristy.png',
      productImageUrl: 'images/products/image-rose.png',
    },
    {
      id: 3,
      title: 'Tinfoild: Tailored tinfoil hats',
      description: 'We already have your measurements and shipping address.',
      url: '#',
      votes: ProductList.generateVoteCount(),
      submitterAvatarUrl: 'images/avatars/veronika.jpg',
      productImageUrl: 'images/products/image-steel.png',
    },
    {
      id: 4,
      title: 'Haught or Naught',
      description: 'High-minded or absent-minded? You decide.',
      url: '#',
      votes: ProductList.generateVoteCount(),
      submitterAvatarUrl: 'images/avatars/molly.png',
      productImageUrl: 'images/products/image-yellow.png',
    }]

  render(){
    const products = ProductList.products.sort((a, b) =>(
      b.votes - a.votes
      ));
    
    const productComponents = ProductList.products.map((product) => (
        <Product
        key={'product-' + product.id} 
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        /> 
    ));
    console.log(productComponents)
    return (
      <div className='ui unstackable items'>
        {productComponents}
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