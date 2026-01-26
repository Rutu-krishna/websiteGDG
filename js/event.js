 const EventsDetail = [
    {
        year: 2025,
        events: [
            {
                Date: "October 26, 2025",
                Key: "Workshop / Study Group",
                Point: "Google Cloud Study Jams: Hands-on Workshop",
                photos:["assets/images/cyber1.jpeg","assets/images/cyber2.jpeg","assets/images/cyber3.jpeg","assets/images/cyber4.jpeg"]
            },
            {
                Date: "October 3, 2025",
                Key: "Speaker Session / Tech Talk",
                Point: "Cyber Threat Intelligence Workshop",
                photos:["assets/images/img1.jpg","assets/images/img2.jpg","assets/images/img1.jpg","assets/images/img2.jpg"]

            },
            {
                Date: "September 19, 2025",
                Key: "Info Session",
                Point: "GDGoC Member Orientation 2025"
            },
            {
                Date: "September 19, 2025",
                Key: "Workshop / Study Group",
                Point: "Profile to Perfection: Enhance Your LinkedIn Presence"
            },
            {
                Date: "March 25, 2025",
                Key: "Workshop / Study Group",
                Point: "FlutterFlow Masterclass: Build Flutter Apps Without Code"
            },
            {
                Date: "Jan 27, 2025",
                Key: "Hackathon",
                Point: "Solution Series"
            }
        ]
    },
    {
        year: 2024,
        events: [
            {
                Date: "Dec 25, 2024",
                Key: "Info Session",
                Point: "Tech Winter Break Introduction to Solutions Challenge – GDG On Campus SKNCOE",
                                photos:["assets/images/img1.jpg","assets/images/img2.jpg","assets/images/img1.jpg","assets/images/img2.jpg"]

            },
            {
                Date: "Dec 6, 2024",
                Key: "Workshop / Study Group",
                Point: "Tech Winter Break – GDG On Campus SKNCOE"
            },
            {
                Date: "Nov 14, 2024",
                Key: "Conference",
                Point: "GDG Orientation: Welcome to the Community!"
            },
            {
                Date: "Oct 4, 2024",
                Key: "Info Session",
                Point: "Gen-AI in Action: Tools, Techniques, and Trends"
            }
        ]
    }
];
const timeline = document.getElementById("timeline");

EventsDetail.forEach(yearObj => {

  // YEAR
  const yearWrapper = document.createElement("div");
  yearWrapper.className = "year-wrapper";
  yearWrapper.innerHTML = `
    <div class="year">
      <h4>${yearObj.year}</h4>
      <button class="toggle-btn">^</button>
    </div>
  `;
  timeline.appendChild(yearWrapper);

  // EVENTS CONTAINER
  const eventContainer = document.createElement("div");
  eventContainer.className = "event-container";

  yearObj.events.forEach(event => {

    const eventSection = document.createElement("div");
    eventSection.className = "event-section";

    /* LEFT SIDE (INFO) */
    const eventInfo = document.createElement("div");
    eventInfo.className = "event-info";
    eventInfo.innerHTML = `
      <h3>${event.Key}</h3>
      <h4>${event.Date}</h4>
      <p>${event.Point}</p>
    `;

    eventSection.appendChild(eventInfo);

    /* RIGHT SIDE (SLIDER) — ONLY IF PHOTOS EXIST */
    if (event.photos && event.photos.length > 0) {
      const slider = document.createElement("div");
      slider.className = "event-photo";

      slider.innerHTML = event.photos
        .map(img => `<img src="${img}" alt="event photo">`)
        .join("");

      eventSection.appendChild(slider);
    }

    eventContainer.appendChild(eventSection);
  });

  timeline.appendChild(eventContainer);

const toggleBtn = yearWrapper.querySelector(".toggle-btn");
  toggleBtn.addEventListener("click", () => {
    eventContainer.classList.toggle("hidden");
    toggleBtn.textContent = eventContainer.classList.contains("hidden") ? "˅" : "^";
  });
});
