const eventForm = document.getElementById('eventForm');
const eventsContainer = document.getElementById('eventsContainer');
const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');

// 1. We no longer use LocalStorage. We start with an empty array.
let events = [];

// 2. Form Submission (Sending data to Node.js/MongoDB)
eventForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Use FormData because we are sending files (images)
    const formData = new FormData();
    formData.append('category', document.getElementById('category').value);
    formData.append('title', document.getElementById('title').value);
    formData.append('day', document.getElementById('day').value);
    formData.append('month', document.getElementById('month').value);
    formData.append('year', document.getElementById('year').value);
    formData.append('time', document.getElementById('time').value);
    formData.append('location', document.getElementById('location').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('regLink', document.getElementById('regLink').value);

    // Append multiple images from the file input
    const files = imageUpload.files;
    for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
    }

    try {
        const response = await fetch('http://localhost:5501/api/events', {
            method: 'POST',
            body: formData // This sends the data to your Node.js server
        });

        if (response.ok) {
            alert("Event successfully saved to MongoDB!");
            eventForm.reset();
            imagePreview.innerHTML = '';
            fetchEvents(); // Refresh the list
        }
    } catch (error) {
        console.error("Error connecting to server:", error);
    }
});

// 3. Fetch Data (Getting data from MongoDB)
async function fetchEvents() {
    try {
        const response = await fetch('http://localhost:5501/api/events');
        events = await response.json();
        renderEvents();
    } catch (error) {
        console.error("Could not fetch events:", error);
    }
}

// 4. Updated Render Function
function renderEvents() {
    eventsContainer.innerHTML = '';
    events.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('event-card');
        
        // Note: MongoDB uses '_id' instead of 'id'
        card.innerHTML = `
            <div class="category-badge">${event.category}</div>
            <div class="event-date">${event.day} ${event.month}, ${event.year}</div>
            <div class="event-title">${event.title}</div>
            <div class="event-info">🕒 ${event.time} | 📍 ${event.location}</div>
            <p class="event-desc">${event.description}</p>
            <div class="image-gallery">
                ${event.images.map(img => `<img src="${img}" class="gallery-img">`).join('')}
            </div>
            <a href="${event.regLink}" target="_blank" class="btn-primary" style="display:block; text-align:center; text-decoration:none;">Register Now</a>
            <button onclick="deleteEvent('${event._id}')" style="margin-top:10px; color:red; border:none; background:none; cursor:pointer;">Delete Event</button>
        `;
        eventsContainer.appendChild(card);
    });
}

// 5. Updated Delete Logic
window.deleteEvent = async (id) => {
    if(confirm('Delete this event permanently from MongoDB?')) {
        await fetch(`http://localhost:5501/api/events/${id}`, {
            method: 'DELETE'
        });
        fetchEvents();
    }
};

// Load data on page start
fetchEvents();