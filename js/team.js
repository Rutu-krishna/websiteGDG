  const SERVER_URL = "http://localhost:5501";
    const API_BASE = `${SERVER_URL}/api/team`;

    async function fetchTeamData() {
        try {
            const [memberRes, coreRes] = await Promise.all([
                fetch(`${API_BASE}/members`),
                fetch(`${API_BASE}/core-team`)
            ]);

            const members = await memberRes.json();
            const coreGroups = await coreRes.json();

            renderMembers(members);
            renderCoreGroups(coreGroups);
        } catch (err) {
            console.error("Error fetching team data:", err);
        }
    }

    function renderMembers(members) {
        // Matches the IDs in your HTML
        const tiers = {
            'organizer': document.getElementById('organizer-row'),
            'domain lead': document.getElementById('leads-row'),
            'domain co-lead': document.getElementById('coleads-row')
        };

        // Clear existing content
        Object.values(tiers).forEach(row => { if(row) row.innerHTML = ""; });

        members.forEach((member, index) => {
            // Match tiers case-insensitively
            const dbTier = member.tier ? member.tier.toLowerCase().trim() : "";
            
            // Normalize "Co-Lead" to match your HTML ID keys
            let tierKey = dbTier;
            if (dbTier === 'co-lead') tierKey = 'domain co-lead';

            const targetRow = tiers[tierKey];
console.log("FULL MEMBER:", member);
console.log("IMAGE FIELD:", member.image);
console.log("TYPE:", typeof member.image);

            if (targetRow) {
                // EXACT IMAGE LOGIC FROM YOUR ADMIN PANEL
            let imagePath = Array.isArray(member.image) ? member.image[0] : member.image;
                console.log("path", imagePath);

                // 2. Build URL safely
                let imgSrc = "https://via.placeholder.com/300";
                if (imagePath) {
                    // Remove leading slashes to prevent double slashes in URL
                    const cleanPath = imagePath.replace('/adminpanel', '').replace(/^\/+/, '');
                    imgSrc = `${SERVER_URL}/${cleanPath}`;
                }
                const card = document.createElement('div');
                card.className = 'member-card';
                // Keeping your cool tilt design
                card.style.transform = index % 2 === 0 ? 'rotate(-1.5deg)' : 'rotate(1.5deg)';

                card.innerHTML = `
                    <div class="image-box">
                        <img src="${imgSrc}" alt="${member.name}" onerror="this.src='https://via.placeholder.com/300'">
                    </div>
                    <div class="info">
                        <h3>${member.name}</h3>
                        <p>${member.domain}</p>
                        <div class="social-links">
                            ${member.linkedin ? `<a href="${member.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ''}
                            ${member.github ? `<a href="${member.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                        </div>
                    </div>
                `;

                targetRow.appendChild(card);
                // Make the section visible
                targetRow.parentElement.style.display = 'block';
                
                if (targetRow.children.length > 3) {
                    targetRow.classList.add('overflow');
                }
            }
        });
    }

    function renderCoreGroups(groups) {
        const container = document.getElementById('core-team-container');
        container.innerHTML = `<div class="tier-label">Our Core Team</div>`;

        groups.forEach(group => {
            // EXACT IMAGE LOGIC FROM YOUR ADMIN PANEL
        //     const imgSrc = group.image
        // ? `${SERVER_URL}${group.image.replace('/adminpanel','')}`
        // : "https://via.placeholder.com/40";

          let imagePath = Array.isArray(group.image) ? group.image[0] : group.image;
                console.log("path", imagePath);

                // 2. Build URL safely
                let imgSrc = "https://via.placeholder.com/300";
                if (imagePath) {
                    // Remove leading slashes to prevent double slashes in URL
                    const cleanPath = imagePath.replace('/adminpanel', '').replace(/^\/+/, '');
                    imgSrc = `${SERVER_URL}/${cleanPath}`;
                }

            const section = document.createElement('div');
            section.className = 'group-photo-container';
            section.innerHTML = `
                <div class="group-card">
                    <div class="group-image">
                        <img src="${imgSrc}" alt="${group.title}" onerror="this.src='https://via.placeholder.com/1200x450'">
                    </div>
                    <div class="group-info">
                        <h2>${group.title}</h2>
                        <p>${group.subtitle || ''}</p>
                        <p style="font-size: 0.9rem; color: #777; margin-top: 15px;">${group.membersList || ''}</p>
                    </div>
                </div>
            `;
            container.appendChild(section);
        });
    }

    window.onload = fetchTeamData;
