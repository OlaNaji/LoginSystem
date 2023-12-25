// Sign-up variables
var signupName = document.getElementById('signupUsername');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signupBtn = document.querySelector('.btn-signup');

// Login variables
var loginEmail = document.getElementById('loginEmail');
var loginPassword = document.getElementById('loginPassword');
var loginBtn = document.querySelector('.login-btn');
var logoutBtn = document.querySelector('.logout-btn');

// Array to store user data
var allUsers = [];

// Check if users exist in local storage and load them
if (JSON.parse(localStorage.getItem('users')) !== null) {
    allUsers = JSON.parse(localStorage.getItem('users'));
}

// Adding Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    // Display welcome message when the DOM is fully loaded
    displayWelcomeMessage();
    
    // Logout event listener
    logoutBtn.addEventListener('click', function () {
        logOut();
    });
});

// Sign-up event listeners
signupName.addEventListener('input', function () {
    validateName(this.value);
});

signupEmail.addEventListener('input', function () {
    validateEmail(this.value);
});

signupPassword.addEventListener('input', function () {
    validatePassword(this.value);
});

signupBtn.addEventListener('click', function () {
    // Handle sign-up button click
    signupNewUser();
});

// Login event listener
loginBtn.addEventListener('click', function () {
    // Handle login button click
    loginUser();
});

// Functions
function displayWelcomeMessage() {
    // Retrieve user name from local storage and display a welcome message
    var userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById('usernameDisplay').textContent = 'Welcome, ' + userName + '!';
    }
}

function loginUser() {
    // Validate user credentials and redirect to home page if successful
    var loggingUser = {
        email: loginEmail.value,
        password: loginPassword.value,
    };

    for (var i = 0; i < allUsers.length; i++) {
        if (loggingUser.email === allUsers[i].email && loggingUser.password === allUsers[i].password) {
            localStorage.setItem('userName', allUsers[i].username);
            window.location.href = 'home.html';
            clearInput();
            return;
        }
    }
    document.querySelector('.login-message').innerHTML = 'Invalid email or password. Please try again.';
    clearInput();
}

function logOut() {
    // Redirect to the index page and remove user name from local storage
    window.location.href = 'index.html';
    localStorage.removeItem('userName');
}

function addNewUser() {
    // Add a new user to the array and update local storage
    var user = {
        username: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    };

    isValidated = validateAll(user.username, user.email, user.password);
    if (isValidated) {
        for (var i = 0; i < allUsers.length; i++) {
            if (user.email === allUsers[i].email) {
                clearInput();
                return 'email is already registered, please log in';
            }
        }

        allUsers.push(user);
        localStorage.setItem('users', JSON.stringify(allUsers));
        clearInput();
        return 'user registered successfully';
    } else {
        return 'please enter correct information';
    }
}

function clearInput() {
    // Clear input fields and remove validation classes
    signupName.value = '';
    signupEmail.value = '';
    signupPassword.value = '';

    signupName.classList.remove('is-valid', 'is-invalid');
    signupEmail.classList.remove('is-valid', 'is-invalid');
    signupPassword.classList.remove('is-valid', 'is-invalid');
}

function signupNewUser() {
    // Handle sign-up process and display a message
    var message = addNewUser();
    document.querySelector('.signup-message').innerHTML = message;
}

// Input Validation Regex
var nameRegex = /^[a-z0-9]{3,}$/;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateName(name) {
    // Validate username using regex and update classes
    if (nameRegex.test(name)) {
        signupName.classList.add('is-valid');
        signupName.classList.remove('is-invalid');
        return true;
    } else {
        signupName.classList.add('is-invalid');
        signupName.classList.remove('is-valid');
        return false;
    }
}

function validateEmail(email) {
    // Validate email using regex and update classes
    if (emailRegex.test(email)) {
        signupEmail.classList.add('is-valid');
        signupEmail.classList.remove('is-invalid');
        return true;
    } else {
        signupEmail.classList.add('is-invalid');
        signupEmail.classList.remove('is-valid');
        return false;
    }
}

function validatePassword() {
    // Validate password complexity and update conditions
    var password = signupPassword.value;

    var uppercaseCondition = /[A-Z]/.test(password);
    updateCondition('uppercaseCondition', uppercaseCondition);

    var specialCharCondition = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    updateCondition('specialCharCondition', specialCharCondition);

    var lengthCondition = password.length >= 8;
    updateCondition('lengthCondition', lengthCondition);

    var numberCondition = /\d/.test(password);
    updateCondition('numberCondition', numberCondition);

    isPasswordValid = uppercaseCondition && specialCharCondition && lengthCondition && numberCondition;
    if (isPasswordValid) {
        signupPassword.classList.add('is-valid');
        signupPassword.classList.remove('is-invalid');
    } else {
        signupPassword.classList.add('is-invalid');
        signupPassword.classList.remove('is-valid');
    }

    return isPasswordValid;
}

function updateCondition(conditionId, isValid) {
    // Update password validation conditions
    var conditionElement = document.getElementById(conditionId);
    conditionElement.style.color = isValid ? 'var(--main-light)' : 'red';
}

function validateAll(name, email, password) {
    // Validate all input fields and return the result
    var isNameValid = validateName(name);
    var isEmailValid = validateEmail(email);
    var isPasswordValid = validatePassword(password);

    return isNameValid && isEmailValid && isPasswordValid;
}

// Alternating between login and signup sections
var loginSection = document.getElementById('login-section');
var loginLabel = document.querySelector('.loginLabel');
var signupLabel = document.querySelector('.signupLabel');

function toggleLogin() {
    // Toggle between login and signup sections
    var isVisible = loginSection.style.top === '15%';

    if (isVisible) {
        loginSection.style.top = '85%';
        loginLabel.style.fontSize = '2rem';
        signupLabel.style.fontSize = '3rem';
    } else {
        loginSection.style.top = '15%';
        loginLabel.style.fontSize = '3rem';
        signupLabel.style.fontSize = '1.3rem';
        document.querySelector('.signup-message').style.display = 'none';
    }

    loginSection.style.transition = 'all 0.5s ease-in-out';
    signupLabel.style.transition = 'font-size 0.5s ease-in-out';
    loginLabel.style.transition = 'font-size 0.5s ease-in-out';
}

// Attach the toggleLogin function to the click event of the element
document.querySelector('.login-paragraph a').addEventListener('click', toggleLogin);
document.querySelector('.signup-paragraph a').addEventListener('click', toggleLogin);
loginLabel.addEventListener('click', toggleLogin);
signupLabel.addEventListener('click', toggleLogin);
