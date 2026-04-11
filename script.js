let currentImageIndex = 0;
let autoScrollInterval = null;
let isAutoScrolling = true;
let soundWidget = null;
let userInteractionFallbackAttached = false;

// Image array
const images = ['assets/images/Maggie1.jpg', 'assets/images/Maggie2.jpg', 'assets/images/Maggie3.jpg'];

// Initialize carousel
function initCarousel() {
    updateCarousel();
    startAutoScroll();
}

// Update carousel display
function updateCarousel() {
    const carouselImages = document.querySelectorAll('.carousel-image');
    carouselImages.forEach((img, index) => {
        img.classList.remove('active');
        if (index === currentImageIndex) {
            img.classList.add('active');
        }
    });
}

// Scroll carousel with arrow buttons
function scrollCarousel(direction) {
    currentImageIndex += direction;
    
    // Loop back to start or end
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    
    updateCarousel();
}

// Auto scroll carousel
function autoScroll() {
    scrollCarousel(1);
}

// Start auto scroll
function startAutoScroll() {
    if (isAutoScrolling) {
        autoScrollInterval = setInterval(autoScroll, 4000); // Change image every 4 seconds
    }
}

// Stop auto scroll
function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Toggle auto scroll
function toggleAutoScroll() {
    isAutoScrolling = !isAutoScrolling;
    const playPauseBtn = document.getElementById('playPauseBtn');
    const pauseIcon = document.getElementById('pauseIcon');
    const playIcon = document.getElementById('playIcon');
    
    if (isAutoScrolling) {
        pauseIcon.style.display = 'block';
        playIcon.style.display = 'none';
        startAutoScroll();
    } else {
        pauseIcon.style.display = 'none';
        playIcon.style.display = 'block';
        stopAutoScroll();
    }
}

function playBackgroundMusic() {
    if (!soundWidget) {
        return;
    }

    soundWidget.play();
}

function setupSoundCloudAutoplay() {
    const playerFrame = document.getElementById('soundcloudPlayer');

    if (!playerFrame || typeof SC === 'undefined' || !SC.Widget) {
        return;
    }

    soundWidget = SC.Widget(playerFrame);

    soundWidget.bind(SC.Widget.Events.READY, () => {
        // Attempt autoplay when the page loads.
        playBackgroundMusic();
    });

    if (!userInteractionFallbackAttached) {
        const startOnFirstInteraction = () => {
            playBackgroundMusic();
            document.removeEventListener('click', startOnFirstInteraction);
            document.removeEventListener('touchstart', startOnFirstInteraction);
            document.removeEventListener('keydown', startOnFirstInteraction);
            userInteractionFallbackAttached = false;
        };

        document.addEventListener('click', startOnFirstInteraction, { once: true });
        document.addEventListener('touchstart', startOnFirstInteraction, { once: true });
        document.addEventListener('keydown', startOnFirstInteraction, { once: true });
        userInteractionFallbackAttached = true;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    setupSoundCloudAutoplay();
});

/* ===== Contact Modal Functions ===== */
function openContactModal(event) {
    event.preventDefault();
    const modal = document.getElementById('contactModal');
    modal.style.display = 'flex';
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactModal();
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('contactModal');
        if (modal.style.display === 'flex') {
            closeContactModal();
        }
    }
});
