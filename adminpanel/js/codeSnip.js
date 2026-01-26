 const API_URL = 'http://localhost:5501/api/v1/snippets';
        const form = document.getElementById('snippetForm');
        const displayArea = document.getElementById('displayArea');

        // 1. Fetch and Display Snippets
        async function loadSnippets() {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                
                if (data.length === 0) {
                    displayArea.innerHTML = "<p>No snippets found in database.</p>";
                    return;
                }

                displayArea.innerHTML = data.map(s => `
                    <div class="snippet-item">
                        <span><strong>${s.title}</strong></span>
                        <p>${s.code}</p>
                        <button class="delete-btn" onclick="deleteSnippet('${s._id}')">Delete</button>
                    </div>
                `).join('');
            } catch (err) {
                displayArea.innerHTML = "Error loading snippets. Is the server running?";
            }
        }

        // 2. Add New Snippet
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const title = document.getElementById('title').value;
            const code = document.getElementById('code').value;

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, code })
                });

                if (response.ok) {
                    alert("Saved Successfully!");
                    form.reset();
                    loadSnippets();
                } else {
                    alert("Server Error: " + await response.text());
                }
            } catch (err) {
                alert("Network error. Check console.");
                console.error(err);
            }
        });

        // 3. Delete Snippet
        async function deleteSnippet(id) {
            if (!confirm("Are you sure?")) return;
            
            try {
                const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                if (res.ok) loadSnippets();
            } catch (err) {
                console.error("Delete failed", err);
            }
        }

        loadSnippets();