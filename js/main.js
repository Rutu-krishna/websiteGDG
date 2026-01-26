window.addEventListener("load", () => {
    const loader = document.getElementById("loader-wrapper");
    setTimeout(() => {
        loader.classList.add("loader-hidden");
        setTimeout(() => {
            loader.style.display = "none";
        }, 800);
    }, 4800);
});

const heroImages = ["assets/hero.png", "assets/hero2.png"];
let index = 0;
const heroImg = document.getElementById("heroImg");

function changeHeroImage() {
    if (!heroImg) return;
    heroImg.classList.add("hero-fade-out");

    setTimeout(() => {
        index = (index + 1) % heroImages.length;
        heroImg.src = heroImages[index];
        heroImg.classList.remove("hero-fade-out");
        heroImg.classList.add("hero-fade-in");
        
        setTimeout(() => {
            heroImg.classList.remove("hero-fade-in");
        }, 1000);
    }, 1000); 
}

setInterval(changeHeroImage, 5000);

function toggleEvents(target) {
    const upcoming = document.getElementById('upcomingBox');
    const past = document.getElementById('pastBox');
    const isPast = target === 'past';

    upcoming.classList.toggle('active', !isPast);
    past.classList.toggle('active', isPast);
}

const track = document.getElementById('sliderTrack');
const cards = document.querySelectorAll('.sponsor-card');
let currentCard = 0;

function rotateSponsors() {
    currentCard = (currentCard + 1) % cards.length;
    const movePercentage = currentCard * 50; 
    track.style.transform = `translateX(-${movePercentage}%) rotateY(${currentCard % 2 === 0 ? '2deg' : '-2deg'})`;
}

setInterval(rotateSponsors, 6000);

document.addEventListener("DOMContentLoaded", () => {
    // Hero Entry
    const hero = document.querySelector(".hero");
    if (hero) setTimeout(() => hero.classList.add("hero-animate"), 300);

    // FAQ Accordion
    document.querySelectorAll(".faq-question").forEach(btn => {
        btn.addEventListener("click", () => {
            const item = btn.parentElement;
            document.querySelectorAll(".faq-item").forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove("active");
            });
            item.classList.toggle("active");
        });
    });

    // Writing Animation Observer
    const target = document.querySelector('.writing-container');
    if (target) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-writing');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });
        observer.observe(target);
    }
});
/* ================== SCROLL REVEAL ANIMATION ================== */
const revealElements = document.querySelectorAll(
  ".reveal-left, .reveal-right"
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // animate only once
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -80px 0px"
  }
);

revealElements.forEach(el => revealObserver.observe(el));
