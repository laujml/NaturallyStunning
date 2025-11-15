// Controlador de Autenticación - Maneja la lógica entre el modelo y la vista
class AuthController {
    constructor(userModel) {
        this.userModel = userModel;
    }

    // Manejar registro
    handleRegister(formData) {
        // Validar que las contraseñas coincidan
        if (formData.password !== formData.confirmPassword) {
            return { success: false, message: 'Las contraseñas no coinciden' };
        }

        // Validar longitud de contraseña
        if (formData.password.length < 6) {
            return { success: false, message: 'La contraseña debe tener al menos 6 caracteres' };
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return { success: false, message: 'Email inválido' };
        }

        // Intentar registrar
        return this.userModel.register({
            name: formData.name,
            email: formData.email,
            password: formData.password
        });
    }

    // Manejar login
    handleLogin(email, password) {
        // Validaciones básicas
        if (!email || !password) {
            return { success: false, message: 'Por favor completa todos los campos' };
        }

        return this.userModel.login(email, password);
    }

    // Manejar logout
    handleLogout() {
        this.userModel.logout();
        window.location.href = 'login.html';
    }

    // Verificar autenticación
    checkAuth() {
        return this.userModel.isLoggedIn();
    }

    // Obtener usuario actual
    getCurrentUser() {
        return this.userModel.getCurrentUser();
    }

    // Actualizar perfil
    handleUpdateProfile(userId, updates) {
        // Validaciones básicas
        if (updates.name && updates.name.trim().length === 0) {
            return { success: false, message: 'El nombre no puede estar vacío' };
        }

        return this.userModel.updateProfile(userId, updates);
    }

    // Proteger página (requiere login)
    requireAuth() {
        if (!this.checkAuth()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
}