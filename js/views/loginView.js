// Vista de Login - Maneja la interfaz de usuario
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar modelo y controlador
    const userModel = new UserModel();
    const authController = new AuthController(userModel);

    // Si ya está logueado, redirigir a perfil
    if (authController.checkAuth()) {
        window.location.href = 'profile.html';
        return;
    }

    // Elementos del DOM
    const loginFormWrapper = document.getElementById('login-form-wrapper');
    const registerFormWrapper = document.getElementById('register-form-wrapper');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');
    const registerSuccess = document.getElementById('register-success');

    // Cambiar entre formularios
    showRegisterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginFormWrapper.classList.add('hidden');
        registerFormWrapper.classList.remove('hidden');
        loginError.textContent = '';
    });

    showLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        registerFormWrapper.classList.add('hidden');
        loginFormWrapper.classList.remove('hidden');
        registerError.textContent = '';
        registerSuccess.textContent = '';
    });

    // Manejar login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const result = authController.handleLogin(email, password);

        if (result.success) {
            window.location.href = 'profile.html';
        } else {
            loginError.textContent = result.message;
        }
    });

    // Manejar registro
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('register-name').value,
            email: document.getElementById('register-email').value,
            password: document.getElementById('register-password').value,
            confirmPassword: document.getElementById('register-confirm-password').value
        };

        const result = authController.handleRegister(formData);

        if (result.success) {
            registerError.textContent = '';
            registerSuccess.textContent = result.message;
            
            // Limpiar formulario
            registerForm.reset();
            
            // Cambiar a login después de 2 segundos
            setTimeout(() => {
                registerFormWrapper.classList.add('hidden');
                loginFormWrapper.classList.remove('hidden');
                registerSuccess.textContent = '';
                
                // Pre-llenar el email en login
                document.getElementById('login-email').value = formData.email;
            }, 2000);
        } else {
            registerSuccess.textContent = '';
            registerError.textContent = result.message;
        }
    });

    // Limpiar mensajes de error al escribir
    document.getElementById('login-email').addEventListener('input', () => loginError.textContent = '');
    document.getElementById('login-password').addEventListener('input', () => loginError.textContent = '');
    document.getElementById('register-name').addEventListener('input', () => registerError.textContent = '');
    document.getElementById('register-email').addEventListener('input', () => registerError.textContent = '');
    document.getElementById('register-password').addEventListener('input', () => registerError.textContent = '');
    document.getElementById('register-confirm-password').addEventListener('input', () => registerError.textContent = '');
});