// Vista del Carrito - ACTUALIZADO Y FUNCIONAL
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar modelos y controladores
    const cartModel = new CartModel();
    const cartController = new CartController(cartModel);
    const userModel = new UserModel();
    const authController = new AuthController(userModel);

    // Elementos del DOM
    const cartEmpty = document.getElementById('cart-empty');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const itemsCount = document.getElementById('items-count');
    const subtotalPrice = document.getElementById('subtotal-price');
    const totalPrice = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const clearCartBtn = document.getElementById('clear-cart-btn');

    // Función para formatear precio
    function formatPrice(price) {
        return `$${price.toFixed(2)} USD`;
    }

    // Función para renderizar el carrito
    function renderCart() {
        const cart = cartController.getCart();
        
        console.log('📦 Renderizando carrito:', cart);
        
        if (cart.length === 0) {
            cartEmpty.style.display = 'block';
            cartItemsContainer.style.display = 'none';
            itemsCount.textContent = '0';
            subtotalPrice.textContent = '$0.00';
            totalPrice.textContent = '$0.00 USD';
            return;
        }

        cartEmpty.style.display = 'none';
        cartItemsContainer.style.display = 'block';

        // Actualizar contador
        const totalItems = cartController.getTotalItems();
        itemsCount.textContent = totalItems;

        // Limpiar contenedor
        cartItemsContainer.innerHTML = '';

        // Renderizar cada item
        cart.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'carrito-item';
            itemEl.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='img/placeholder.png'">
                </div>
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p class="item-price">${formatPrice(item.price)}</p>
                </div>
                <div class="item-quantity">
                    <label>Cantidad:</label>
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease-qty" data-id="${item.id}">−</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" 
                               min="1" data-id="${item.id}" readonly>
                        <button class="quantity-btn increase-qty" data-id="${item.id}">+</button>
                    </div>
                </div>
                <div class="item-actions">
                    <span class="item-price">${formatPrice(item.price * item.quantity)}</span>
                    <button class="btn-remove" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });

        // Actualizar totales
        updateTotals();

        // Adjuntar event listeners
        attachEventListeners();
    }

    // Función para actualizar totales
    function updateTotals() {
        const total = cartController.getTotal();
        subtotalPrice.textContent = formatPrice(total);
        totalPrice.textContent = formatPrice(total) + ' USD';
    }

    // Función para adjuntar event listeners
    function attachEventListeners() {
        // Botones de aumentar cantidad
        document.querySelectorAll('.increase-qty').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.dataset.id;
                const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
                let quantity = parseInt(input.value) + 1;
                
                input.value = quantity;
                cartController.handleUpdateQuantity(productId, quantity);
                renderCart();
            });
        });

        // Botones de disminuir cantidad
        document.querySelectorAll('.decrease-qty').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.dataset.id;
                const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
                let quantity = parseInt(input.value);
                
                if (quantity > 1) {
                    quantity--;
                    input.value = quantity;
                    cartController.handleUpdateQuantity(productId, quantity);
                    renderCart();
                }
            });
        });

        // Botones de eliminar
        document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.dataset.id;
                if (confirm('¿Eliminar este producto del carrito?')) {
                    cartController.handleRemoveItem(productId);
                    renderCart();
                    showNotification('Producto eliminado del carrito');
                }
            });
        });
    }

    // Vaciar carrito
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('¿Estás seguro que deseas vaciar el carrito?')) {
                cartController.handleClearCart();
                renderCart();
                showNotification('Carrito vaciado');
            }
        });
    }

    // Proceder al checkout
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cartController.isEmpty()) {
                alert('Tu carrito está vacío');
                return;
            }

            // Verificar si hay usuario logueado
            if (!authController.checkAuth()) {
                if (confirm('Debes iniciar sesión para continuar. ¿Ir a login?')) {
                    window.location.href = 'login.html';
                }
                return;
            }

            const user = authController.getCurrentUser();
            const result = cartController.handleCheckout(user);

            if (result.success) {
                alert(`¡Orden procesada exitosamente!\n\nTotal: ${formatPrice(result.order.total)}\n\nGracias por tu compra, ${user.name}!`);
                renderCart();
            } else {
                alert(result.message);
            }
        });
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
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // Renderizar carrito al cargar
    console.log('🚀 Iniciando CartView...');
    renderCart();

    // Agregar estilos de animación
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
    `;
    document.head.appendChild(style);
});