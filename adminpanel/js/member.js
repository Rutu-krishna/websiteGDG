const API_BASE = "http://localhost:5501/api/team";
let events=[]
image=document.getElementById('indPhoto') // We can add Multer later for file uploads

// --- ADD INDIVIDUAL MEMBER ---
// document.getElementById('individualMemberForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     const memberData = {
//         name: document.getElementById('indName').value,
//         domain: document.getElementById('indDomain').value,
//         tier: document.getElementById('indTier').value, // Used as Key for filtering
//         linkedin: document.getElementById('indLinkedin').value,
//         github: document.getElementById('indGithub').value,
//     };
     
//     const files=image.files;
//     for(let i=0;i<files;i++){
//         memberData.append('image',files[i]);
//     }

//     try {
//         const response = await fetch(`${API_BASE}/members`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(memberData)
//         });

//         if (response.ok) {
//             alert("Member added to database!");
//             e.target.reset();
//             loadMembersToTable(); // Refresh the admin table
//         }
//     } catch (err) {
//         console.error("Failed to save member", err);
//     }
// });



// --- ADD CORE TEAM / DOMAIN GROUP ---
// document.getElementById('domainGroupForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     const domainData = {
//         title: document.getElementById('domTitle').value,
//         subtitle: document.getElementById('domSubtitle').value,
//         membersList: document.getElementById('domMembers').value,
//         image: "https://via.placeholder.com/300x200"
//     };

//     try {
//         const response = await fetch(`${API_BASE}/core-team`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(domainData)
//         });

//         if (response.ok) {
//             alert("Core Domain group saved!");
//             e.target.reset();
//             loadDomainsToTable();
//         }
//     } catch (err) {
//         console.error("Failed to save domain", err);
//     }
// });

// --- LOAD INDIVIDUAL MEMBERS TO TABLE ---



// --- ADD INDIVIDUAL MEMBER ---

// --- ADD INDIVIDUAL MEMBER ---
document.getElementById('individualMemberForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', document.getElementById('indName').value);
    formData.append('domain', document.getElementById('indDomain').value);
    formData.append('tier', document.getElementById('indTier').value);
    formData.append('linkedin', document.getElementById('indLinkedin').value);
    formData.append('github', document.getElementById('indGithub').value);
    
    const photoInput = document.getElementById('indPhoto');
    // Grab the first file from the FileList
    if (photoInput.files && photoInput.files[0]) {
        formData.append('image', photoInput.files[0]);
    }
    
    try {
        const response = await fetch(`${API_BASE}/members`, {
            method: 'POST',
            body: formData // Browser handles headers automatically
        });

        if (response.ok) {
            alert("Member added successfully!");
            e.target.reset();
            loadMembersToTable();
        }
    } catch (err) {
        console.error("Failed to save member", err);
    }
});

// --- ADD CORE TEAM / DOMAIN GROUP ---
document.getElementById('domainGroupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', document.getElementById('domTitle').value);
    formData.append('subtitle', document.getElementById('domSubtitle').value);
    formData.append('membersList', document.getElementById('domMembers').value);
    
    const photoInput = document.getElementById('domPhoto');
    if (photoInput.files && photoInput.files[0]) {
        formData.append('image', photoInput.files[0]);
    }

    try {
        const response = await fetch(`${API_BASE}/core-team`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert("Core Domain group saved!");
            e.target.reset();
            loadDomainsToTable();
        }
    } catch (err) {
        console.error("Failed to save domain", err);
    }
});
async function loadMembersToTable() {
    const tableBody = document.getElementById('individualTableBody');
    
    try {
        const response = await fetch(`${API_BASE}/members`);
        const members = await response.json();

        tableBody.innerHTML = ""; // Clear table first

        members.forEach(member => {
            const imgSrc = member.image ? `http://localhost:5501${member.image}` : "https://via.placeholder.com/40";
            const row = document.createElement('tr');
            row.innerHTML = `
            <td><img src="${imgSrc}" style="width:40px; height:40px; border-radius:50%; object-fit:cover;"></td>
                <td>
                    <div style="font-weight:600;">${member.name}</div>
                    <div style="font-size:0.8rem; color:#666;">${member.domain}</div>
                </td>
                <td><span class="badge badge-${member.tier.toLowerCase().replace(' ', '-')}">${member.tier}</span></td>
                <td>
                    <div class="table-socials">
                        ${member.linkedin ? `<a href="${member.linkedin}" target="_blank" style="color:#0077b5;"><i class="fab fa-linkedin"></i></a>` : ''}
                        ${member.github ? `<a href="${member.github}" target="_blank" style="color:#333;"><i class="fab fa-github"></i></a>` : ''}
                    </div>
                </td>
                <td>
                    <button class="action-btn delete" onclick="deleteItem('members', '${member._id}')"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (err) {
        console.error("Error loading members table:", err);
    }
}

// --- LOAD CORE DOMAINS TO TABLE ---
async function loadDomainsToTable() {
    const tableBody = document.getElementById('coreTeamTableBody');
    
    try {
        const response = await fetch(`${API_BASE}/core-team`);
        const domains = await response.json();

        tableBody.innerHTML = ""; 

        // Inside loadDomainsToTable()
domains.forEach(dom => {
    // FIX: Apply the same server-prefix logic here
    const imgSrc = dom.image ? `http://localhost:5501${dom.image}` : "https://via.placeholder.com/60x40";
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${imgSrc}" style="width:60px; height:40px; border-radius:4px; object-fit:cover;"></td>
        <td>
            <div style="font-weight:600;">${dom.title}</div>
            <div style="font-size:0.8rem; color:#666;">${dom.subtitle}</div>
        </td>
        <td><div style="font-size:0.8rem; max-width:200px;">${dom.membersList}</div></td>
        <td>
            <button class="action-btn delete" onclick="deleteItem('core-team', '${dom._id}')"><i class="fas fa-trash"></i></button>
        </td>
    `;
    tableBody.appendChild(row);
});
    } catch (err) {
        console.error("Error loading domains table:", err);
    }
}

// --- DELETE LOGIC ---
async function deleteItem(type, id) {
    if(!confirm("Are you sure you want to delete this?")) return;

    try {
        const response = await fetch(`${API_BASE}/${type}/${id}`, { method: 'DELETE' });
        if(response.ok) {
            type === 'members' ? loadMembersToTable() : loadDomainsToTable();
        }
    } catch (err) {
        alert("Delete failed");
    }
}


// Initialize tables when page loads
window.addEventListener('DOMContentLoaded', () => {
    loadMembersToTable();
    loadDomainsToTable();
});