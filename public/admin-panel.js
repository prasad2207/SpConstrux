document.addEventListener("DOMContentLoaded", function () {
    fetch('http://localhost:8080/get-responses')  // Update URL if needed
        .then(response => response.json())
        .then(data => {
            const responseContainer = document.getElementById("responseData");

            if (!responseContainer) {
                console.error("Error: 'responseData' div not found.");
                return;
            }

            if (data.success) {
                let output = `
                    <table border="1" width="100%" cellspacing="0" cellpadding="5">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Message</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="responseTableBody">
                `;

                data.responses.forEach((resp, index) => {
                    output += generateTableRow(resp, index);
                });

                output += `</tbody></table>`;
                responseContainer.innerHTML = output;
            } else {
                responseContainer.innerHTML = "<p>Error fetching responses.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching responses:", error);
            document.getElementById("responseData").innerHTML = "<p>Could not load responses.</p>";
        });
});

// ✅ Function to generate table row
function generateTableRow(resp, index) {
    return `
        <tr id="row-${index}">
            <td>${index + 1}</td>
            <td>${resp.name}</td>
            <td>${resp.mobile}</td>
            <td>${resp.message}</td>
            <td id="status-${index}">${resp.contacted ? "✔ Contacted" : "❌ Not Contacted"}</td>
            <td>
                <button onclick="markAsContacted(${index})" id="contact-btn-${index}" ${resp.contacted ? "disabled" : ""}>Mark as Contacted</button>
                <button onclick="deleteResponse(${index})" style="color: red;">Delete</button>
            </td>
        </tr>
    `;
}

// ✅ Mark as contacted
function markAsContacted(index) {
    fetch(`http://localhost:8080/mark-contacted/${index}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById(`status-${index}`).innerHTML = "✔ Contacted";
                document.getElementById(`contact-btn-${index}`).disabled = true;
            } else {
                alert("Error marking as contacted.");
            }
        })
        .catch(error => console.error("Error marking as contacted:", error));
}

// ❌ Delete response
function deleteResponse(index) {
    fetch(`http://localhost:8080/delete-response/${index}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById(`row-${index}`).remove();
                reloadTable();
            } else {
                alert("Error deleting response.");
            }
        })
        .catch(error => console.error("Error deleting response:", error));
}

// 🔄 Reload Table After Deletion
function reloadTable() {
    const rows = document.querySelectorAll("#responseTableBody tr");
    rows.forEach((row, newIndex) => {
        row.id = `row-${newIndex}`;
        row.cells[0].textContent = newIndex + 1;
        row.cells[4].id = `status-${newIndex}`;
        row.cells[5].querySelector("button").setAttribute("onclick", `markAsContacted(${newIndex})`);
        row.cells[5].querySelector("button:nth-child(2)").setAttribute("onclick", `deleteResponse(${newIndex})`);
    });
}
