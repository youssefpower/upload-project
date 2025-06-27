// Get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// Save user to localStorage
function saveUser(name, email, password) {
    let users = getUsers();
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
}

// Check email exists
function isEmailExists(email) {
    let users = getUsers();
    return users.some(user => user.email === email);
}

// Validate email format
function validateEmail(email) {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return pattern.test(email);
}

// Registration
if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", function(e) {
        e.preventDefault();
        let name = document.getElementById("regName").value.trim();
        let email = document.getElementById("regEmail").value.trim();
        let password = document.getElementById("regPassword").value.trim();
        let msg = document.getElementById("registerMessage");

        if (name.length === 0) {
            msg.textContent = "Name cannot be empty!";
            return;
        }
        if (!validateEmail(email)) {
            msg.textContent = "Invalid email format!";
            return;
        }
        if (password.length < 6) {
            msg.textContent = "Password must be at least 6 characters!";
            return;
        }
        if (isEmailExists(email)) {
            msg.textContent = "Email already exists!";
            return;
        }
        saveUser(name, email, password);
        msg.style.color = "green";
        msg.textContent = "Registered successfully! Redirecting to login...";
        setTimeout(() => window.location.href = "login.html", 1500);
    });
}

// Login
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function(e) {
        e.preventDefault();
        let email = document.getElementById("loginEmail").value.trim();
        let password = document.getElementById("loginPassword").value.trim();
        let msg = document.getElementById("loginMessage");
        let users = getUsers();

        if (!validateEmail(email)) {
            msg.textContent = "Invalid email format!";
            return;
        }
        let user = users.find(u => u.email === email);
        if (!user) {
            msg.textContent = "This email is not registered!";
            return;
        }
        if (user.password !== password) {
            msg.textContent = "Wrong password!";
            return;
        }
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "home.html";
    });
}

// Home Page
if (document.getElementById("welcomeMessage")) {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        window.location.href = "login.html";
    } else {
        document.getElementById("welcomeMessage").textContent = "Welcome " + user.name;
        document.getElementById("logoutBtn").addEventListener("click", function() {
            localStorage.removeItem("currentUser");
            window.location.href = "login.html";
        });
    }
}