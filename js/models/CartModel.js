// Modelo de Carrito - Maneja la lógica de datos del carrito de compras
class CartModel {
    constructor() {
        this.storageKey = 'ns_cart';
    }

    // Obtener carrito actual
    getCart() {
        const cart = localStorage.getItem(this.storageKey);
        return cart ? JSON.parse(cart) : [];
    }

    // Guardar carrito
    saveCart(cart) {
        localStorage.setItem(this.storageKey, JSON.stringify(cart));
    }

    // Agregar producto al carrito
    addItem(product) {
        const cart = this.getCart();
        const existingItemIndex = cart.findIndex(item => item.id === product.id);

        if (existingItemIndex > -1) {
            // Si ya existe, aumentar cantidad
            cart[existingItemIndex].quantity += 1;
        } else {
            // Si no existe, agregar nuevo
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.saveCart(cart);
        return { success: true, cart: cart };
    }

    // Actualizar cantidad de un producto
    updateQuantity(productId, quantity) {
        const cart = this.getCart();
        const itemIndex = cart.findIndex(item => item.id === productId);

        if (itemIndex === -1) {
            return { success: false, message: 'Producto no encontrado' };
        }

        if (quantity <= 0) {
            // Si la cantidad es 0 o negativa, eliminar el producto
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity = quantity;
        }

        this.saveCart(cart);
        return { success: true, cart: cart };
    }

    // Eliminar producto del carrito
    removeItem(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== productId);
        this.saveCart(cart);
        return { success: true, cart: cart };
    }

    // Limpiar carrito
    clearCart() {
        this.saveCart([]);
        return { success: true };
    }

    // Obtener total del carrito
    getTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Obtener cantidad total de items
    getTotalItems() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Verificar si el carrito está vacío
    isEmpty() {
        return this.getCart().length === 0;
    }
}