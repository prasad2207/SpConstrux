document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".navbar-toggler");
    const navOverlay = document.querySelector(".nav-overlay");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    button.addEventListener("click", function () {
        navOverlay.classList.toggle("active");
    });

    navOverlay.addEventListener("click", function (event) {
        if (event.target === navOverlay) {
            navOverlay.classList.remove("active");
            navbarCollapse.classList.remove("show");
        }
    });
});

function solveSimpleChallenge() {
    console.log("Function is working!");
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded!");
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();  // Prevent form from submitting the default way

        const formData = {
            name: document.getElementById("name").value,
            mobile: document.getElementById("mobile").value,  // Capturing mobile number
            message: document.getElementById("message").value
        };

        // Send the data to the backend to send the email
        fetch('https://spconstrux-node.onrender.com/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.text())
        .then(data => {
            alert('Message sent successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error sending message');
        });
    });
});

