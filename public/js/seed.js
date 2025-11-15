window.Seed = (function () {
  
  function generateVoteCount() {
    return Math.floor((Math.random() * 50) + 15);
  }

  function generateDate() {
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString();
  }

  const categories = [
    'Tecnologia', 'Casa & Jardim', 'Moda', 'Esportes', 
    'Livros', 'Eletrônicos', 'Decoração', 'Cozinha', 'Ferramentas'
  ];

  const products = [
    {
      id: 1,
      title: 'Balde Amarelo Premium',
      description: 'Expertise em construção de castelos de areia sob demanda. Material resistente e durável para todas as suas aventuras na praia.',
      url: '#',
      votes: generateVoteCount(),
      downvotes: Math.floor(Math.random() * 10),
      submitterAvatarUrl: 'images/avatars/daniel.jpg',
      productImageUrl: 'images/products/image-aqua.png',
      category: 'Casa & Jardim',
      price: 'R$ 29,90',
      rating: 4.5,
      reviews: 23,
      createdAt: generateDate(),
      tags: ['praia', 'verão', 'diversão'],
      featured: true
    },
    {
      id: 2,
      title: 'Supermaioria: A Liga de Fantasia do Congresso',
      description: 'Ganhe pontos quando seus políticos favoritos aprovarem legislação. Jogo estratégico e educativo para toda a família.',
      url: '#',
      votes: generateVoteCount(),
      downvotes: Math.floor(Math.random() * 10),
      submitterAvatarUrl: 'images/avatars/kristy.png',
      productImageUrl: 'images/products/image-rose.png',
      category: 'Livros',
      price: 'R$ 89,90',
      rating: 4.8,
      reviews: 156,
      createdAt: generateDate(),
      tags: ['jogo', 'educação', 'política'],
      featured: true
    },
    {
      id: 3,
      title: 'Tinfoild: Chapéus de Alumínio Premium',
      description: 'Já temos suas medidas e endereço de envio. Proteção máxima com estilo único. Disponível em várias cores.',
      url: '#',
      votes: generateVoteCount(),
      downvotes: Math.floor(Math.random() * 10),
      submitterAvatarUrl: 'images/avatars/veronika.jpg',
      productImageUrl: 'images/products/image-steel.png',
      category: 'Moda',
      price: 'R$ 49,90',
      rating: 3.9,
      reviews: 67,
      createdAt: generateDate(),
      tags: ['acessório', 'proteção', 'estilo'],
      featured: false
    },
    {
      id: 4,
      title: 'Elegante ou Descuidado - Coleção Exclusiva',
      description: 'Elevado ou desatento? Você decide. Uma linha de produtos que desafia as convenções do design moderno.',
      url: '#',
      votes: generateVoteCount(),
      downvotes: Math.floor(Math.random() * 10),
      submitterAvatarUrl: 'images/avatars/molly.png',
      productImageUrl: 'images/products/image-yellow.png',
      category: 'Decoração',
      price: 'R$ 199,90',
      rating: 4.2,
      reviews: 89,
      createdAt: generateDate(),
      tags: ['design', 'exclusivo', 'moderno'],
      featured: true
    },
    {
      id: 5,
      title: 'SmartWatch Pro Max',
      description: 'Relógio inteligente com todas as funcionalidades que você precisa. Monitoramento de saúde, GPS, e muito mais.',
      url: '#',
      votes: generateVoteCount(),
      downvotes: Math.floor(Math.random() * 10),
      submitterAvatarUrl: 'images/avatars/daniel.jpg',
      productImageUrl: 'images/products/image-aqua.png',
      category: 'Eletrônicos',
      price: 'R$ 899,90',
      rating: 4.7,
      reviews: 342,
      createdAt: generateDate(),
      tags: ['smartwatch', 'tecnologia', 'saúde'],
      featured: true
    },
    {
      id: 6,
      title: 'Kit Ferramentas Profissional',
      description: 'Conjunto completo de ferramentas para qualquer projeto. Qualidade profissional com garantia de 5 anos.',
      url: '#',
      votes: generateVoteCount(),
      downvotes: Math.floor(Math.random() * 10),
      submitterAvatarUrl: 'images/avatars/kristy.png',
      productImageUrl: 'images/products/image-rose.png',
      category: 'Ferramentas',
      price: 'R$ 349,90',
      rating: 4.6,
      reviews: 201,
      createdAt: generateDate(),
      tags: ['ferramentas', 'profissional', 'qualidade'],
      featured: false
    },
    {
      id: 7,
      title: 'Livro: A Arte da Programação',
      description: 'Guia completo para desenvolvedores. Do básico ao avançado, com exemplos práticos e exercícios.',
      url: '#',
      votes: generateVoteCount(),
      downvotes: Math.floor(Math.random() * 10),
      submitterAvatarUrl: 'images/avatars/veronika.jpg',
      productImageUrl: 'images/products/image-steel.png',
      category: 'Livros',
      price: 'R$ 79,90',
      rating: 4.9,
      reviews: 567,
      createdAt: generateDate(),
      tags: ['programação', 'educação', 'tecnologia'],
      featured: true
    },
    {
      id: 8,
      title: 'Tênis Esportivo Ultra Leve',
      description: 'Tênis perfeito para corrida e caminhada. Tecnologia de amortecimento avançada e design moderno.',
      url: '#',
      votes: generateVoteCount(),
      downvotes: Math.floor(Math.random() * 10),
      submitterAvatarUrl: 'images/avatars/molly.png',
      productImageUrl: 'images/products/image-yellow.png',
      category: 'Esportes',
      price: 'R$ 299,90',
      rating: 4.4,
      reviews: 134,
      createdAt: generateDate(),
      tags: ['esportes', 'corrida', 'conforto'],
      featured: false
    },
    {
      id: 9,
      title: 'Panela Antiaderente Premium',
      description: 'Cozinha saudável sem óleo. Revestimento cerâmico de alta qualidade, fácil limpeza e durabilidade garantida.',
      url: '#',
      votes: generateVoteCount(),
      downvotes: Math.floor(Math.random() * 10),
      submitterAvatarUrl: 'images/avatars/daniel.jpg',
      productImageUrl: 'images/products/image-aqua.png',
      category: 'Cozinha',
      price: 'R$ 129,90',
      rating: 4.3,
      reviews: 98,
      createdAt: generateDate(),
      tags: ['cozinha', 'saudável', 'qualidade'],
      featured: false
    },
    {
      id: 10,
      title: 'Lâmpada LED Inteligente',
      description: 'Controle via app, mudança de cores, programação de horários. Economia de energia e tecnologia de ponta.',
      url: '#',
      votes: generateVoteCount(),
      downvotes: Math.floor(Math.random() * 10),
      submitterAvatarUrl: 'images/avatars/kristy.png',
      productImageUrl: 'images/products/image-rose.png',
      category: 'Tecnologia',
      price: 'R$ 89,90',
      rating: 4.5,
      reviews: 245,
      createdAt: generateDate(),
      tags: ['led', 'smart', 'casa inteligente'],
      featured: true
    },
    {
      id: 11,
      title: 'Cadeira Ergonômica Executiva',
      description: 'Conforto máximo para longas horas de trabalho. Ajuste de altura, apoio lombar e braços reguláveis.',
      url: '#',
      votes: generateVoteCount(),
      downvotes: Math.floor(Math.random() * 10),
      submitterAvatarUrl: 'images/avatars/veronika.jpg',
      productImageUrl: 'images/products/image-steel.png',
      category: 'Casa & Jardim',
      price: 'R$ 599,90',
      rating: 4.7,
      reviews: 312,
      createdAt: generateDate(),
      tags: ['escritório', 'ergonomia', 'conforto'],
      featured: true
    },
    {
      id: 12,
      title: 'Tablet Android 10"',
      description: 'Performance excepcional para trabalho e entretenimento. Tela Full HD, 64GB de armazenamento.',
      url: '#',
      votes: generateVoteCount(),
      downvotes: Math.floor(Math.random() * 10),
      submitterAvatarUrl: 'images/avatars/molly.png',
      productImageUrl: 'images/products/image-yellow.png',
      category: 'Eletrônicos',
      price: 'R$ 699,90',
      rating: 4.4,
      reviews: 189,
      createdAt: generateDate(),
      tags: ['tablet', 'android', 'tecnologia'],
      featured: false
    }
  ];

  return { 
    products: products,
    categories: categories
  };
}());
