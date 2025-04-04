function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        window.location.href = "admin-panel.html"; // ✅ Redirect to Admin Panel
    } else {
        document.getElementById("error").textContent = "Invalid username or password.";
    }
}
