// Created by Yash Jadhav
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const message = document.getElementById('message');
    const togglePassword = document.getElementById('togglePassword');
    const rememberMe = document.getElementById('rememberMe');
    const spinner = document.getElementById('spinner');

    // Show/hide password
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Remember me 
    if (localStorage.getItem('rememberMe') === 'true') {
        emailInput.value = localStorage.getItem('email');
        rememberMe.checked = true;
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        emailError.textContent = '';
        passwordError.textContent = '';
        message.textContent = '';

        // Validate email
        if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address.';
            return;
        }

        // Validate password
        if (passwordInput.value.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long.';
            return;
        }

        // Show spinner
        spinner.style.display = 'block';

        // Remember me logic
        if (rememberMe.checked) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('email', emailInput.value);
        } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('email');
        }

        // API call
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: emailInput.value,
                password: passwordInput.value
            })
        })
        .then(response => response.json())
        .then(data => {
            spinner.style.display = 'none';
            message.textContent = 'Login successful!';
            message.style.color = 'green';
        })
        .catch(error => {
            spinner.style.display = 'none';
            message.textContent = 'Login failed. Please try again.';
            message.style.color = 'red';
        });
    });

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }
});
