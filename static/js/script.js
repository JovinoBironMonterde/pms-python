document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".nav-link-load");
    const contentDiv = document.getElementById("dynamic-content");

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();  // Stop default navigation

            const pageUrl = this.getAttribute("data-url");  // Get the URL

            fetch(pageUrl)
                .then(response => response.text())
                .then(html => {
                    // Extract only the content block from response
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, "text/html");
                    const newContent = doc.querySelector("#dynamic-content").innerHTML;

                    // Replace content
                    contentDiv.innerHTML = newContent;
                    window.history.pushState({}, "", pageUrl); // Change URL without reloading
                })
                .catch(error => console.error("Error loading page:", error));
        });
    });
});

function refreshPage() {
    window.location.href = "{{ url_for('dashboard') }}";
    window.location.reload();
}




