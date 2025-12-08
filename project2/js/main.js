const apiKey = "YIDsCSLlxKj1Rii6MppnGQJIOaTL56Z0";
function clearGIFs() {
    document.getElementById("searchInput").value = "";
    document.getElementById("results").innerHTML = "";
}
function searchGIFs() {
    const input = document.getElementById("searchInput").value.trim();
    if (!input) return;

    const container = document.getElementById("results");
    container.innerHTML = "<p class='text-center'>Loading GIFs...</p>";
    
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(input)}&limit=24&rating=g`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("results");
            container.innerHTML = "";

            if (data.data.length === 0) {
                container.innerHTML = "<p class='text-center'>No GIFs found for this search.</p>";
                return;
            }

            data.data.forEach(gif => {
                const col = document.createElement("div");
                col.className = "col-12 col-sm-6 col-md-3 mb-4";

                col.innerHTML = `
                    <div class="card h-100">
                        <img src="${gif.images.fixed_height.url}" class="card-img-top" alt="${gif.title}">
                        <div class="card-body">
                            <p class="card-text text-truncate">${gif.title}</p>
                        </div>
                    </div>
                `;
                container.appendChild(col);
            });
        })
        .catch(error => {
            console.error("Error fetching GIFs:", error);
            const container = document.getElementById("results");
            container.innerHTML = "<p class='text-center text-danger'>Oops! Something went wrong. Please try again.</p>";
        });
}


