// Controlador de Carrito - Maneja la lógica entre el modelo y la vista
class CartController {
    constructor(cartModel) {
        this.cartModel = cartModel;
    }

    // Agregar producto
    handleAddToCart(product) {
        // Validaciones
        if (!product.id || !product.name || !product.price) {
            return { success: false, message: 'Datos del producto inválidos' };
        }

        return this.cartModel.addItem(product);
    }

    // Actualizar cantidad
    handleUpdateQuantity(productId, quantity) {
        const quantityNum = parseInt(quantity);

        if (isNaN(quantityNum) || quantityNum < 0) {
            return { success: false, message: 'Cantidad inválida' };
        }

        return this.cartModel.updateQuantity(productId, quantityNum);
    }

    // Eliminar producto
    handleRemoveItem(productId) {
        if (!productId) {
            return { success: false, message: 'ID de producto inválido' };
        }

        return this.cartModel.removeItem(productId);
    }

    // Vaciar carrito
    handleClearCart() {
        return this.cartModel.clearCart();
    }

    // Obtener carrito
    getCart() {
        return this.cartModel.getCart();
    }

    // Obtener total
    getTotal() {
        return this.cartModel.getTotal();
    }

    // Obtener total de items
    getTotalItems() {
        return this.cartModel.getTotalItems();
    }

    // Verificar si está vacío
    isEmpty() {
        return this.cartModel.isEmpty();
    }

    // Procesar checkout (simulado por ahora)
    handleCheckout(userInfo) {
        if (this.isEmpty()) {
            return { success: false, message: 'El carrito está vacío' };
        }

        // Aquí iría la lógica de procesamiento de pago
        // Por ahora solo simulamos
        const cart = this.getCart();
        const total = this.getTotal();

        // Crear orden simulada
        const order = {
            id: Date.now().toString(),
            user: userInfo,
            items: cart,
            total: total,
            date: new Date().toISOString(),
            status: 'pending'
        };

        // Limpiar carrito después de la orden
        this.handleClearCart();

        return { 
            success: true, 
            message: 'Orden procesada exitosamente',
            order: order 
        };
    }
}