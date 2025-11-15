// Enhanced Voting App with Multiple Features

class App extends React.Component {
  state = {
    products: [],
    filteredProducts: [],
    searchQuery: '',
    sortBy: 'votes-desc',
    selectedCategories: [],
    voteRange: 100,
    viewMode: 'grid',
    showModal: false,
    selectedProduct: null
  }

  componentDidMount() {
    // Load from localStorage or use seed data
    const savedProducts = localStorage.getItem('votingAppProducts');
    const savedState = localStorage.getItem('votingAppState');
    
    if (savedProducts) {
      const products = JSON.parse(savedProducts);
      this.setState({ products, filteredProducts: products }, () => {
        this.applyFilters();
      });
    } else {
      const products = Seed.products;
      this.setState({ products, filteredProducts: products }, () => {
        this.saveToLocalStorage();
        this.applyFilters();
      });
    }

    if (savedState) {
      const state = JSON.parse(savedState);
      this.setState({ ...state }, () => {
        this.applyFilters();
      });
    }

    // Setup event listeners
    this.setupEventListeners();
    this.updateStats();
  }

  setupEventListeners = () => {
    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.setState({ searchQuery: e.target.value }, () => {
          this.applyFilters();
        });
      });
    }

    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.setState({ sortBy: e.target.value }, () => {
          this.applyFilters();
        });
      });
    }

    // Vote range
    const voteRange = document.getElementById('vote-range');
    if (voteRange) {
      voteRange.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        document.getElementById('range-value').textContent = value === 100 ? '100+' : value;
        this.setState({ voteRange: value }, () => {
          this.applyFilters();
        });
      });
    }

    // View toggle
    document.getElementById('grid-view')?.addEventListener('click', () => {
      this.setState({ viewMode: 'grid' });
      document.getElementById('grid-view').classList.add('active');
      document.getElementById('list-view').classList.remove('active');
    });

    document.getElementById('list-view')?.addEventListener('click', () => {
      this.setState({ viewMode: 'list' });
      document.getElementById('list-view').classList.add('active');
      document.getElementById('grid-view').classList.remove('active');
    });

    // Clear filters
    document.getElementById('clear-filters')?.addEventListener('click', () => {
      this.setState({
        searchQuery: '',
        sortBy: 'votes-desc',
        selectedCategories: [],
        voteRange: 100
      }, () => {
        document.getElementById('search-input').value = '';
        document.getElementById('sort-select').value = 'votes-desc';
        document.getElementById('vote-range').value = 100;
        document.getElementById('range-value').textContent = '100+';
        this.renderCategoryFilters();
        this.applyFilters();
      });
    });

    // Modal close
    document.querySelector('.close-modal')?.addEventListener('click', () => {
      this.closeModal();
    });

    window.addEventListener('click', (e) => {
      const modal = document.getElementById('product-modal');
      if (e.target === modal) {
        this.closeModal();
      }
    });
  }

  applyFilters = () => {
    let filtered = [...this.state.products];

    // Search filter
    if (this.state.searchQuery) {
      const query = this.state.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (this.state.selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        this.state.selectedCategories.includes(product.category)
      );
    }

    // Vote range filter
    filtered = filtered.filter(product =>
      product.votes <= this.state.voteRange
    );

    // Sort
    filtered = this.sortProducts(filtered);

    this.setState({ filteredProducts: filtered }, () => {
      this.updateStats();
      this.showNoResults(filtered.length === 0);
    });
  }

  sortProducts = (products) => {
    const sorted = [...products];
    const [field, order] = this.state.sortBy.split('-');

    sorted.sort((a, b) => {
      let aVal, bVal;

      switch (field) {
        case 'votes':
          aVal = a.votes - a.downvotes;
          bVal = b.votes - b.downvotes;
          break;
        case 'title':
          aVal = a.title.toLowerCase();
          bVal = b.title.toLowerCase();
          break;
        case 'newest':
        case 'oldest':
          aVal = new Date(a.createdAt);
          bVal = new Date(b.createdAt);
          break;
        default:
          return 0;
      }

      if (field === 'newest' || field === 'oldest') {
        return order === 'desc' ? bVal - aVal : aVal - bVal;
      }

      if (typeof aVal === 'string') {
        return order === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return order === 'desc' ? bVal - aVal : aVal - bVal;
    });

    return sorted;
  }

  handleProductUpVote = (productId) => {
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return { ...product, votes: product.votes + 1 };
      }
      return product;
    });
    this.setState({ products: nextProducts }, () => {
      this.saveToLocalStorage();
      this.applyFilters();
    });
  }

  handleProductDownVote = (productId) => {
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return { ...product, downvotes: product.downvotes + 1 };
      }
      return product;
    });
    this.setState({ products: nextProducts }, () => {
      this.saveToLocalStorage();
      this.applyFilters();
    });
  }

  toggleCategory = (category) => {
    const selectedCategories = this.state.selectedCategories.includes(category)
      ? this.state.selectedCategories.filter(c => c !== category)
      : [...this.state.selectedCategories, category];
    
    this.setState({ selectedCategories }, () => {
      this.renderCategoryFilters();
      this.applyFilters();
    });
  }

  renderCategoryFilters = () => {
    const categoryFilters = document.getElementById('category-filters');
    if (!categoryFilters) return;

    const categories = [...new Set(this.state.products.map(p => p.category))];
    
    categoryFilters.innerHTML = categories.map(category => {
      const isSelected = this.state.selectedCategories.includes(category);
      return `
        <label class="category-checkbox ${isSelected ? 'active' : ''}">
          <input type="checkbox" ${isSelected ? 'checked' : ''} 
                 onchange="window.app.toggleCategory('${category}')">
          <span>${category}</span>
        </label>
      `;
    }).join('');
  }

  openModal = (product) => {
    this.setState({ showModal: true, selectedProduct: product });
    document.getElementById('product-modal').style.display = 'block';
  }

  closeModal = () => {
    this.setState({ showModal: false, selectedProduct: null });
    document.getElementById('product-modal').style.display = 'none';
  }

  saveToLocalStorage = () => {
    localStorage.setItem('votingAppProducts', JSON.stringify(this.state.products));
    localStorage.setItem('votingAppState', JSON.stringify({
      searchQuery: this.state.searchQuery,
      sortBy: this.state.sortBy,
      selectedCategories: this.state.selectedCategories,
      voteRange: this.state.voteRange,
      viewMode: this.state.viewMode
    }));
  }

  updateStats = () => {
    const totalProducts = this.state.products.length;
    const totalVotes = this.state.products.reduce((sum, p) => sum + p.votes, 0);
    
    document.getElementById('total-products').textContent = totalProducts;
    document.getElementById('total-votes').textContent = totalVotes;
  }

  showNoResults = (show) => {
    const noResults = document.getElementById('no-results');
    const content = document.getElementById('content');
    if (noResults) {
      noResults.style.display = show ? 'flex' : 'none';
      content.style.display = show ? 'none' : 'block';
    }
  }

  componentDidUpdate() {
    this.renderCategoryFilters();
  }

  render() {
    const productComponents = this.state.filteredProducts.map((product) => (
      <Product
        key={'product-' + product.id}
        product={product}
        onUpVote={this.handleProductUpVote}
        onDownVote={this.handleProductDownVote}
        onOpenModal={this.openModal}
        viewMode={this.state.viewMode}
      />
    ));

    return (
      <div className={`products-container ${this.state.viewMode}-view`}>
        {productComponents}
      </div>
    );
  }
}

class Product extends React.Component {
  handleUpVote = (e) => {
    e.stopPropagation();
    this.props.onUpVote(this.props.product.id);
  }

  handleDownVote = (e) => {
    e.stopPropagation();
    this.props.onDownVote(this.props.product.id);
  }

  handleClick = () => {
    this.props.onOpenModal(this.props.product);
  }

  renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    return stars;
  }

  render() {
    const { product, viewMode } = this.props;
    const netVotes = product.votes - product.downvotes;
    const daysAgo = Math.floor((new Date() - new Date(product.createdAt)) / (1000 * 60 * 60 * 24));

    if (viewMode === 'list') {
      return (
        <div className="product-card list-item" onClick={this.handleClick}>
          <div className="product-image">
            <img src={product.productImageUrl} alt={product.title} />
            {product.featured && <span className="featured-badge">Destaque</span>}
          </div>
          <div className="product-content">
            <div className="product-header">
              <h3>{product.title}</h3>
              <span className="product-category">{product.category}</span>
            </div>
            <p className="product-description">{product.description}</p>
            <div className="product-tags">
              {product.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <div className="product-footer">
              <div className="product-meta">
                <div className="rating">
                  {this.renderStars(product.rating)}
                  <span>({product.reviews})</span>
                </div>
                <div className="price">{product.price}</div>
                <div className="date">Há {daysAgo} dias</div>
              </div>
              <div className="vote-section">
                <button className="vote-btn upvote" onClick={this.handleUpVote}>
                  <i className="fas fa-arrow-up"></i>
                  <span>{product.votes}</span>
                </button>
                <button className="vote-btn downvote" onClick={this.handleDownVote}>
                  <i className="fas fa-arrow-down"></i>
                  <span>{product.downvotes}</span>
                </button>
                <div className="net-votes">{netVotes > 0 ? '+' : ''}{netVotes}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="product-card" onClick={this.handleClick}>
        <div className="product-image">
          <img src={product.productImageUrl} alt={product.title} />
          {product.featured && <span className="featured-badge">Destaque</span>}
          <div className="product-overlay">
            <button className="btn-view-details">
              <i className="fas fa-eye"></i> Ver Detalhes
            </button>
          </div>
        </div>
        <div className="product-content">
          <div className="product-header">
            <h3>{product.title}</h3>
            <span className="product-category">{product.category}</span>
          </div>
          <p className="product-description">{product.description}</p>
          <div className="product-tags">
            {product.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <div className="product-meta">
            <div className="rating">
              {this.renderStars(product.rating)}
              <span>({product.reviews})</span>
            </div>
            <div className="price">{product.price}</div>
          </div>
          <div className="vote-section">
            <button className="vote-btn upvote" onClick={this.handleUpVote}>
              <i className="fas fa-arrow-up"></i>
              <span>{product.votes}</span>
            </button>
            <button className="vote-btn downvote" onClick={this.handleDownVote}>
              <i className="fas fa-arrow-down"></i>
              <span>{product.downvotes}</span>
            </button>
            <div className="net-votes">{netVotes > 0 ? '+' : ''}{netVotes}</div>
          </div>
          <div className="product-footer-info">
            <span className="submitter">
              <img src={product.submitterAvatarUrl} alt="Vendedor" />
            </span>
            <span className="date">Há {daysAgo} dias</span>
          </div>
        </div>
      </div>
    );
  }
}

// Make app instance available globally for event handlers
let appInstance = null;

class AppWrapper extends React.Component {
  render() {
    return <App ref={ref => { appInstance = ref; window.app = ref; }} />;
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById('content'));
