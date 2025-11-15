// Vista de Promociones - Maneja la interfaz de promociones
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar controladores
    const cartModel = new CartModel();
    const cartController = new CartController(cartModel);

    // Elementos del DOM
    const featuredPromosContainer = document.getElementById('featured-promos');
    const exclusivePromosContainer = document.getElementById('exclusive-promos');

    // Función para formatear precio
    function formatPrice(price) {
        return `$${price.toFixed(2)} USD`;
    }

    // Función para calcular descuento
    function calculateDiscount(original, current) {
        return Math.round(((original - current) / original) * 100);
    }

    // Función para renderizar productos en promoción
    function renderPromotionProducts() {
        const promoProducts = getPromotionProducts();
        
        // Productos destacados (los primeros 2 con descuento)
        const featured = promoProducts.slice(0, 2);
        featuredPromosContainer.innerHTML = '';
        
        featured.forEach(product => {
            const discount = calculateDiscount(product.originalPrice, product.price);
            const card = document.createElement('div');
            card.className = 'destacada-card';
            
            const categoryName = {
                'skincare': 'Cuidado de la Piel',
                'makeup': 'Maquillaje',
                'accessories': 'Accesorios'
            }[product.category];

            card.innerHTML = `
                <div class="destacada-image">
                    <div class="promo-badge">-${discount}%</div>
                    <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:60px;opacity:0.3\\'>🌿</span>';">
                </div>
                <div class="destacada-info">
                    <span class="product-category">${categoryName}</span>
                    <h4>${product.name}</h4>
                    <p class="description">${product.description}</p>
                    ${product.benefits ? `
                        <ul class="benefits">
                            ${product.benefits.slice(0, 3).map(b => `<li>✓ ${b}</li>`).join('')}
                        </ul>
                    ` : ''}
                    <div class="price-container">
                        <span class="price-old">${formatPrice(product.originalPrice)}</span>
                        <span class="price-new">${formatPrice(product.price)}</span>
                    </div>
                    <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">
                        Agregar al Carrito
                    </button>
                </div>
            `;
            
            featuredPromosContainer.appendChild(card);
        });

        // Productos exclusivos (el resto con descuentos menores o productos destacados)
        const exclusive = [...promoProducts.slice(2), ...getBestSellers().filter(p => !p.originalPrice).slice(0, 3)];
        exclusivePromosContainer.innerHTML = '';
        
        exclusive.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            let discount = 0;
            if (product.originalPrice) {
                discount = calculateDiscount(product.originalPrice, product.price);
            }

            card.innerHTML = `
                ${discount > 0 ? `<div class="promo-badge-small">-${discount}%</div>` : '<div class="promo-badge-small bestseller">⭐ Best Seller</div>'}
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:40px;opacity:0.3\\'>🌿</span>';">
                <h4>${product.name}</h4>
                <div class="price-container">
                    ${product.originalPrice ? `<span class="price-old">${formatPrice(product.originalPrice)}</span>` : ''}
                    <span class="price-new">${formatPrice(product.price)}</span>
                </div>
                <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">
                    Agregar
                </button>
            `;
            
            exclusivePromosContainer.appendChild(card);
        });

        // Adjuntar event listeners
        attachEventListeners();
    }

    // Función para adjuntar event listeners
    function attachEventListeners() {
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.dataset.productId;
                addToCart(productId);
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

    // Renderizar productos al cargar
    renderPromotionProducts();

    // Agregar estilos para la animación de notificación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
        .cart-icon {
            position: relative;
        }
        .cart-badge {
            position: absolute;
            top: -8px;
            right: -8px;
            background: #e74c3c;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
});