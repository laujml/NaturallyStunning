// Vista de Perfil - Maneja la interfaz de usuario del perfil
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar modelo y controlador
    const userModel = new UserModel();
    const authController = new AuthController(userModel);

    // Proteger página - requiere login
    if (!authController.requireAuth()) {
        return;
    }

    // Obtener usuario actual
    const currentUser = authController.getCurrentUser();

    // Elementos del DOM
    const userInitials = document.getElementById('user-initials');
    const userNameDisplay = document.getElementById('user-name-display');
    const userEmailDisplay = document.getElementById('user-email-display');
    const profileForm = document.getElementById('profile-form');
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profilePhone = document.getElementById('profile-phone');
    const profileAddress = document.getElementById('profile-address');
    const profileSuccess = document.getElementById('profile-success');
    const profileError = document.getElementById('profile-error');
    const logoutBtn = document.getElementById('logout-btn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Función para obtener iniciales
    function getInitials(name) {
        const names = name.split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }

    // Cargar datos del usuario
    function loadUserData() {
        userInitials.textContent = getInitials(currentUser.name);
        userNameDisplay.textContent = currentUser.name;
        userEmailDisplay.textContent = currentUser.email;
        
        profileName.value = currentUser.name;
        profileEmail.value = currentUser.email;
        profilePhone.value = currentUser.phone || '';
        profileAddress.value = currentUser.address || '';
    }

    loadUserData();

    // Manejo de tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Remover active de todos
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Activar seleccionado
            this.classList.add('active');
            document.getElementById(tabName + '-tab').classList.add('active');
        });
    });

    // Actualizar perfil
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const updates = {
            name: profileName.value.trim(),
            phone: profilePhone.value.trim(),
            address: profileAddress.value.trim()
        };

        const result = authController.handleUpdateProfile(currentUser.id, updates);

        if (result.success) {
            profileError.textContent = '';
            profileSuccess.textContent = result.message;
            
            // Actualizar visualización
            currentUser.name = result.user.name;
            currentUser.phone = result.user.phone;
            currentUser.address = result.user.address;
            
            userNameDisplay.textContent = currentUser.name;
            userInitials.textContent = getInitials(currentUser.name);
            
            // Limpiar mensaje después de 3 segundos
            setTimeout(() => {
                profileSuccess.textContent = '';
            }, 3000);
        } else {
            profileSuccess.textContent = '';
            profileError.textContent = result.message;
        }
    });

    // Cerrar sesión
    logoutBtn.addEventListener('click', function() {
        if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
            authController.handleLogout();
        }
    });

    // Limpiar mensajes al escribir
    profileName.addEventListener('input', () => {
        profileError.textContent = '';
        profileSuccess.textContent = '';
    });
});