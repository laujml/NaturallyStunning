// Vista de Productos - Maneja la interfaz del catálogo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar controladores
    const cartModel = new CartModel();
    const cartController = new CartController(cartModel);

    // Variables globales
    let currentProducts = getAllProducts();
    let currentFilters = {
        category: 'all',
        featured: false,
        bestseller: false,
        promotion: false,
        search: ''
    };

    // Elementos del DOM
    const productsGrid = document.getElementById('products-grid');
    const productCount = document.getElementById('product-count');
    const noResults = document.getElementById('no-results');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const sortSelect = document.getElementById('sort-select');
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    const filterFeatured = document.getElementById('filter-featured');
    const filterBestseller = document.getElementById('filter-bestseller');
    const filterPromotion = document.getElementById('filter-promotion');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const resetSearchBtn = document.getElementById('reset-search');
    const modal = document.getElementById('product-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');

    // Función para formatear precio
    function formatPrice(price) {
        return `$${price.toFixed(2)} USD`;
    }

    // Función para renderizar productos
    function renderProducts(products) {
        productsGrid.innerHTML = '';

        if (products.length === 0) {
            noResults.style.display = 'block';
            productCount.textContent = '0';
            return;
        }

        noResults.style.display = 'none';
        productCount.textContent = products.length;

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.dataset.productId = product.id;

            let badge = '';
            if (product.originalPrice) {
                const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                badge = `<span class="product-badge">-${discount}%</span>`;
            } else if (product.bestSeller) {
                badge = `<span class="product-badge bestseller">Best Seller</span>`;
            } else if (product.featured) {
                badge = `<span class="product-badge featured">Destacado</span>`;
            }

            const categoryName = {
                'skincare': 'Cuidado de la Piel',
                'makeup': 'Maquillaje',
                'accessories': 'Accesorios'
            }[product.category];

            card.innerHTML = `
                ${badge}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'placeholder\\'>🌿</span>';">
                </div>
                <div class="product-info">
                    <p class="product-category">${categoryName}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">
                        <span class="price-current">${formatPrice(product.price)}</span>
                        ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">
                            Agregar al Carrito
                        </button>
                        <button class="btn btn-icon view-details-btn" data-product-id="${product.id}">
                            👁️
                        </button>
                    </div>
                </div>
            `;

            productsGrid.appendChild(card);
        });

        // Adjuntar event listeners
        attachProductListeners();
    }

    // Función para adjuntar event listeners a los productos
    function attachProductListeners() {
        // Botones de agregar al carrito
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const productId = this.dataset.productId;
                addToCart(productId);
            });
        });

        // Botones de ver detalles
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const productId = this.dataset.productId;
                showProductModal(productId);
            });
        });

        // Click en la tarjeta completa
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function() {
                const productId = this.dataset.productId;
                showProductModal(productId);
            });
        });
    }

    // Función para agregar al carrito
    function addToCart(productId) {
        const product = getProductById(productId);
        if (!product) return;

        const result = cartController.handleAddToCart(product);
        
        if (result.success) {
            // Actualizar badge del carrito
            const cartBadge = document.getElementById('cart-badge');
            if (cartBadge) {
                const totalItems = cartController.getTotalItems();
                cartBadge.textContent = totalItems;
                cartBadge.style.display = 'flex';
            }

            // Animación de confirmación
            showNotification('✓ Producto agregado al carrito');
        }
    }

    // Función para mostrar notificación
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 25px;
            border-radius: 6px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // Función para mostrar modal de producto
    function showProductModal(productId) {
        const product = getProductById(productId);
        if (!product) return;

        const categoryName = {
            'skincare': 'Cuidado de la Piel',
            'makeup': 'Maquillaje',
            'accessories': 'Accesorios'
        }[product.category];

        modalBody.innerHTML = `
            <div class="modal-product">
                <div class="modal-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'placeholder\\' style=\\'font-size:80px\\'>🌿</span>';">
                </div>
                <div class="modal-details">
                    <p class="product-category">${categoryName}</p>
                    <h2>${product.name}</h2>
                    <div class="product-price">
                        <span class="price-current">${formatPrice(product.price)}</span>
                        ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                    <p class="product-description">${product.description}</p>
                    ${product.benefits ? `
                        <div class="benefits-list">
                            <h4>Beneficios:</h4>
                            <ul>
                                ${product.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    <p class="stock-info ${product.stock < 10 ? 'low' : ''}">
                        ${product.stock > 0 ? `${product.stock} unidades disponibles` : 'Agotado'}
                    </p>
                    <div class="product-actions">
                        <button class="btn btn-primary" onclick="document.dispatchEvent(new CustomEvent('addToCartFromModal', {detail: '${product.id}'}))">
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Cerrar modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    // Event listener para agregar al carrito desde el modal
    document.addEventListener('addToCartFromModal', function(e) {
        addToCart(e.detail);
        closeModal();
    });

    // Función para aplicar filtros
    function applyFilters() {
        let filtered = getAllProducts();

        // Filtro de categoría
        if (currentFilters.category !== 'all') {
            filtered = filtered.filter(p => p.category === currentFilters.category);
        }

        // Filtro de destacados
        if (currentFilters.featured) {
            filtered = filtered.filter(p => p.featured);
        }

        // Filtro de best sellers
        if (currentFilters.bestseller) {
            filtered = filtered.filter(p => p.bestSeller);
        }

        // Filtro de promoción
        if (currentFilters.promotion) {
            filtered = filtered.filter(p => p.originalPrice !== null);
        }

        // Búsqueda
        if (currentFilters.search) {
            const query = currentFilters.search.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        currentProducts = filtered;
        applySorting();
    }

    // Función para aplicar ordenamiento
    function applySorting() {
        const sortValue = sortSelect.value;
        let sorted = [...currentProducts];

        switch (sortValue) {
            case 'name-asc':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price-asc':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
        }

        renderProducts(sorted);
    }

    // Event listeners de filtros
    categoryRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            currentFilters.category = this.value;
            applyFilters();
        });
    });

    filterFeatured.addEventListener('change', function() {
        currentFilters.featured = this.checked;
        applyFilters();
    });

    filterBestseller.addEventListener('change', function() {
        currentFilters.bestseller = this.checked;
        applyFilters();
    });

    filterPromotion.addEventListener('change', function() {
        currentFilters.promotion = this.checked;
        applyFilters();
    });

    // Búsqueda
    function performSearch() {
        currentFilters.search = searchInput.value.trim();
        applyFilters();
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });

    // Ordenamiento
    sortSelect.addEventListener('change', applySorting);

    // Limpiar filtros
    clearFiltersBtn.addEventListener('click', function() {
        currentFilters = {
            category: 'all',
            featured: false,
            bestseller: false,
            promotion: false,
            search: ''
        };
        
        document.querySelector('input[value="all"]').checked = true;
        filterFeatured.checked = false;
        filterBestseller.checked = false;
        filterPromotion.checked = false;
        searchInput.value = '';
        sortSelect.value = 'default';
        
        applyFilters();
    });

    // Reset búsqueda
    resetSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        currentFilters.search = '';
        applyFilters();
    });

    // Renderizar productos iniciales
    renderProducts(currentProducts);
});