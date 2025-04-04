document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded!");

    // Navbar Toggle for Mobile
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

    // Contact Form Submission
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();  
    
        const formData = {
            name: document.getElementById("name").value,
            mobile: document.getElementById("mobile").value,
            message: document.getElementById("message").value
        };
    
        // 1. Send Email
        // fetch('https://spconstrux-node.onrender.com/send-email', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.text())
        // .then(data => {
        //     alert('Message sent successfully!');
        // })
        // .catch((error) => {
        //     console.error('Error sending email:', error);
        //     alert('Error sending message');
        // });
    
        // 2. Save Form Response
        fetch('http://localhost:8080/save-response', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(async (response) => {
            const text = await response.text();
            try {
                const json = JSON.parse(text);
                console.log('Response saved:', json.message);
                alert('Message sent successfully!');
            } catch (e) {
                console.warn("Response is not JSON:", text);
                alert('Error sending message json issue');
            }
        })
        .catch((error) => {
            console.error('Error saving response:', error);
            alert('Error sending message');
        });
        
    });
    

    // **Work Hours Chart**
    const workHoursCanvas = document.getElementById('workHoursChart');
    if (workHoursCanvas) {
        workHoursCanvas.style.width = "100%";
        workHoursCanvas.style.height = "250px";  

        const workHoursCtx = workHoursCanvas.getContext('2d');
        new Chart(workHoursCtx, {
            type: 'bar',
            data: {
                labels: ['Today', 'This Month', 'This Year'],
                datasets: [{
                    label: 'Work Hours',
                    data: [8, 160, 1920],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, max: 2000 }
                }
            }
        });
    } else {
        console.error("Canvas element #workHoursChart not found!");
    }

    // **Ongoing Projects Chart**
    let ctx = document.getElementById("ongoingProjectsChart");
    if (ctx) {
        ctx = ctx.getContext("2d");
        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["In Progress", "Completed", "Pending"],
                datasets: [{
                    label: "Ongoing Projects",
                    data: [5, 8, 3],
                    backgroundColor: ["#007bff", "#28a745", "#ffc107"],
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    } else {
        console.error("Canvas element #ongoingProjectsChart not found!");
    }

    // Update Static Values
    document.getElementById('total-projects').innerText = 120;
    document.getElementById('happy-customers').innerText = 98;

});
