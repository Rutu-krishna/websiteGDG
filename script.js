const mainContainer = document.getElementById('current-timeline');
console.log("script.js loaded");
console.log("mainContainer:", mainContainer);

async function loadWebsiteEvents() {
    try {
        

        const response = await fetch('http://localhost:5501/api/events');
         const events = await response.json();

        mainContainer.innerHTML = '';

        events.forEach(event => {
            const card = document.createElement('div');
            card.className = 'event-display-card';

            const h1 = document.createElement('h1');
            h1.textContent = event.title;

            const h2 = document.createElement('h2');
            h2.textContent = event.category;
            h2.style.color = "#4285F4";

            const pInfo = document.createElement('p');
            pInfo.innerHTML = `📅 <b>${event.day} ${event.month} ${event.year}</b> | 🕒 ${event.time}`;

            const pLoc = document.createElement('p');
            pLoc.textContent = `📍 ${event.location}`;

        //    if (event.images && event.images.length > 0) {
        //         const img = document.createElement('img');
                
        //         const imagePath = event.images[0].startsWith('http') 
        //             ? event.images[0] 
        //             : `http://localhost:5501/${event.images[0]}`;

        //         img.src = imagePath;
        //         img.className = "main-event-img";
        //         card.appendChild(img);
        //     }
        
            // event.images.map(img => `<img src="${img}" class="gallery-img">`).join('')
            // Inside your loadWebsiteEvents() function, where you create the card:

        // This goes inside your events.forEach loop in script.js
            const imageGallery = document.createElement('div');
            imageGallery.className = 'image-gallery';

            if (event.images && event.images.length > 0) {
                imageGallery.innerHTML = event.images.map(img => {
                    // Since your backend already saves the full URL, 
                    // just use 'img' directly.
                    return `
                        <img src="${img}" 
                            class="gallery-img" 
                            onload="this.classList.add('loaded')"
                            onerror="this.src='https://via.placeholder.com/300x200?text=Error+Loading+Image'">
                    `;
                }).join('');
            } else {
                // Placeholder to keep the box size stable
                imageGallery.innerHTML = `<img src="https://via.placeholder.com/300x200?text=No+Images" class="gallery-img loaded">`;
            }
            card.appendChild(imageGallery);

            card.appendChild(h1);
            card.appendChild(h2);
            card.appendChild(pInfo);
            card.appendChild(pLoc);

            const regBtn = document.createElement('a');
            regBtn.href = event.regLink;
            regBtn.target = "_blank";
            regBtn.textContent = "Register for Event";
            regBtn.className = "btn-register";

            card.appendChild(regBtn);
            mainContainer.appendChild(card);
        });

    } catch (err) {
        console.error("Error loading events:", err);
    }
}





window.onload = loadWebsiteEvents;
