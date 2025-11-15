// Modelo de Usuario - Maneja la lógica de datos de usuarios
class UserModel {
    constructor() {
        this.storageKey = 'ns_users';
        this.currentUserKey = 'ns_current_user';
    }

    // Obtener todos los usuarios
    getAllUsers() {
        const users = localStorage.getItem(this.storageKey);
        return users ? JSON.parse(users) : [];
    }

    // Guardar usuarios
    saveUsers(users) {
        localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    // Registrar nuevo usuario
    register(userData) {
        const users = this.getAllUsers();
        
        // Verificar si el email ya existe
        if (users.some(user => user.email === userData.email)) {
            return { success: false, message: 'Este correo ya está registrado' };
        }

        // Crear nuevo usuario
        const newUser = {
            id: Date.now().toString(),
            name: userData.name,
            email: userData.email,
            password: userData.password, // En producción, esto debe ser hasheado
            createdAt: new Date().toISOString(),
            phone: '',
            address: ''
        };

        users.push(newUser);
        this.saveUsers(users);

        return { success: true, message: 'Cuenta creada exitosamente', user: newUser };
    }

    // Iniciar sesión
    login(email, password) {
        const users = this.getAllUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Guardar sesión actual (sin password por seguridad)
            const sessionUser = { ...user };
            delete sessionUser.password;
            localStorage.setItem(this.currentUserKey, JSON.stringify(sessionUser));
            return { success: true, user: sessionUser };
        }

        return { success: false, message: 'Email o contraseña incorrectos' };
    }

    // Obtener usuario actual
    getCurrentUser() {
        const user = localStorage.getItem(this.currentUserKey);
        return user ? JSON.parse(user) : null;
    }

    // Cerrar sesión
    logout() {
        localStorage.removeItem(this.currentUserKey);
    }

    // Verificar si hay sesión activa
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }

    // Actualizar perfil de usuario
    updateProfile(userId, updates) {
        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return { success: false, message: 'Usuario no encontrado' };
        }

        // Actualizar datos (excepto password y email que requieren validación especial)
        users[userIndex] = {
            ...users[userIndex],
            name: updates.name || users[userIndex].name,
            phone: updates.phone || users[userIndex].phone,
            address: updates.address || users[userIndex].address
        };

        this.saveUsers(users);

        // Actualizar sesión actual
        const updatedUser = { ...users[userIndex] };
        delete updatedUser.password;
        localStorage.setItem(this.currentUserKey, JSON.stringify(updatedUser));

        return { success: true, message: 'Perfil actualizado', user: updatedUser };
    }
}