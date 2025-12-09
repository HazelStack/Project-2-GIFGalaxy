const apiKey = "YIDsCSLlxKj1Rii6MppnGQJIOaTL56Z0";
function clearGIFs() {
    document.getElementById("searchInput").value = "";
    document.getElementById("results").innerHTML = "";
}
function searchGIFs() {
    const input = document.getElementById("searchInput").value.trim();
    const container = document.getElementById("results");
    if (!input) return;

    container.innerHTML = `
        <div class="d-flex justify-content-center my-4">
            <div class="spinner-border text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(input)}&limit=24&rating=g`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {
                container.innerHTML = "";

                if (data.data.length === 0) {
                    container.innerHTML = "<p class='text-center'>No GIFs found for this search.</p>";
                    return;
                }

                data.data.forEach(gif => {
                    const col = document.createElement("div");
                    col.className = "col-12 col-sm-6 col-md-3 mb-4";

                    col.innerHTML = `
                        <div class="card">
                            <img src="${gif.images.fixed_height.url}" class="card-img-top"  alt="${gif.title}">
                            <div class="card-body">
                                
                            </div>
                        </div>
                    `;

                    container.appendChild(col);
                });
            }, 1000);
        })
        .catch(() => {
            container.innerHTML = "<p class='text-center text-danger'>Oops! Something went wrong. Please try again.</p>";
        });
}