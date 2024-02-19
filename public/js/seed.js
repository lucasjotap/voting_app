window.Seed = (function () {
  
  function generateVoteCount() {
    return Math.floor((Math.random() * 50) + 15);
  }

const products = [
    {
      id: 1,
      title: 'Balde Amarelo',
      description: 'Expertise em construção de castelos de areia sob demanda.',
      url: '#',
      votes: generateVoteCount(),
      submitterAvatarUrl: 'images/avatars/daniel.jpg',
      productImageUrl: 'images/products/image-aqua.png',
    },
    {
      id: 2,
      title: 'Supermaioria: A Liga de Fantasia do Congresso',
      description: 'Ganhe pontos quando seus políticos favoritos aprovarem legislação.',
      url: '#',
      votes: generateVoteCount(),
      submitterAvatarUrl: 'images/avatars/kristy.png',
      productImageUrl: 'images/products/image-rose.png',
    },
    {
      id: 3,
      title: 'Tinfoild: Chapéus de alumínio feitos sob medida',
      description: 'Já temos suas medidas e endereço de envio.',
      url: '#',
      votes: generateVoteCount(),
      submitterAvatarUrl: 'images/avatars/veronika.jpg',
      productImageUrl: 'images/products/image-steel.png',
    },
    {
      id: 4,
      title: 'Elegante ou Descuidado',
      description: 'Elevado ou desatento? Você decide.',
      url: '#',
      votes: generateVoteCount(),
      submitterAvatarUrl: 'images/avatars/molly.png',
      productImageUrl: 'images/products/image-yellow.png',
    },
  ];


  return { products: products };
}());
