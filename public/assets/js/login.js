document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        
        const baseUrl = (window.BASE_URL !== undefined ? window.BASE_URL : '').replace(/\/$/, '');
        const loginUrl = `${baseUrl}/app/controllers/login_process.php`;
        fetch(loginUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const redirectUrl = `${baseUrl}/`;
                window.location.href = redirectUrl;
            } else {
                Swal.fire({
                    title: '¡Error!',
                    text: data.message,
                    icon: 'error',
                    confirmButtonColor: '#0075ff'
                });
            }
        })
        .catch(error => {
            Swal.fire({
                title: '¡Error!',
                text: 'Error al intentar iniciar sesión',
                icon: 'error',
                confirmButtonColor: '#0075ff'
            });
        });
    });
});