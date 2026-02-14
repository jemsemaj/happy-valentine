// script.js

// Audio player setup
let audioPlayer = null;
let isMusicPlaying = false;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayCat();
    initializeAudio();
    
    // Show greeting after cat loads
    setTimeout(() => {
        document.getElementById('greeting').classList.remove('hidden');
        document.getElementById('envelope-container').classList.remove('hidden');
    }, 1000);
    
    // Add click event to envelope
    document.getElementById('envelope').addEventListener('click', openEnvelope);
});

// Initialize audio player
function initializeAudio() {
    // Create audio element
    audioPlayer = new Audio();
    audioPlayer.loop = false; // Loop the music
    audioPlayer.volume = 0.4; // Set volume to 40% (comfortable level)
    
      // Try multiple romantic song options (in order of preference)
    const musicSources = [
        'your-romantic-songsss.mp3', // Instrumental
        'C:\Users\James\Desktop\valentines-proj\your-romantic-songsss.mp3', // Alternative
        // Add your own music file here if you have one:
        // 'your-romantic-song.mp3'
    ];
    
    // Set the first source
    audioPlayer.src = musicSources[0];
    
    // If first source fails, try the next one
    audioPlayer.addEventListener('error', function() {
        const currentIndex = musicSources.indexOf(audioPlayer.src);
        if (currentIndex < musicSources.length - 1) {
            console.log('Music source failed, trying next...');
            audioPlayer.src = musicSources[currentIndex + 1];
            audioPlayer.load();
            attemptAutoPlay();
        }
    });
    
    // Create music control button
    createMusicControl();
    
    // Attempt to play music immediately
    attemptAutoPlay();
    
    // Also try to play on any user interaction as backup
    document.addEventListener('click', function playOnFirstClick() {
        if (!isMusicPlaying) {
            attemptAutoPlay();
        }
        document.removeEventListener('click', playOnFirstClick);
    }, { once: true });
}

// Attempt to autoplay music
function attemptAutoPlay() {
    if (!audioPlayer) return;
    
    audioPlayer.play()
        .then(() => {
            isMusicPlaying = true;
            updateMusicControl(true);
            console.log('Music started successfully!');
        })
        .catch(error => {
            console.log('Auto-play prevented by browser:', error);
            updateMusicControl(false);
            
            // Create a subtle hint that music is available
            showMusicHint();
        });
}

// Update music control button appearance
function updateMusicControl(isPlaying) {
    const musicControl = document.getElementById('music-control');
    if (!musicControl) return;
    
    if (isPlaying) {
        musicControl.innerHTML = '🎶';
        musicControl.classList.add('playing');
        musicControl.setAttribute('aria-label', 'Music Playing');
    } else {
        musicControl.innerHTML = '🎵';
        musicControl.classList.remove('playing');
        musicControl.setAttribute('aria-label', 'Click to Play Music');
    }
}



// Create music control button
function createMusicControl() {
    const musicControl = document.createElement('div');
    musicControl.id = 'music-control';
    musicControl.className = 'music-control';
    musicControl.innerHTML = '🎵';
    musicControl.setAttribute('aria-label', 'Click to Play Music');
    document.body.appendChild(musicControl);
    
    // Add click event to toggle music
    musicControl.addEventListener('click', toggleMusic);
}

// Toggle music play/pause
function toggleMusic() {
    if (!audioPlayer) return;
    
    if (isMusicPlaying) {
        audioPlayer.pause();
        isMusicPlaying = false;
        updateMusicControl(false);
    } else {
        audioPlayer.play()
            .then(() => {
                isMusicPlaying = true;
                updateMusicControl(true);
            })
            .catch(error => {
                console.log('Playback failed:', error);
                alert('Unable to play music. Please try again.');
            });
    }
}

// Function to open envelope with animation
function openEnvelope() {
    var envelope = document.getElementById('envelope');
    var envelopeContainer = document.getElementById('envelope-container');
    var letterContent = document.getElementById('letter-content');
    var options = document.getElementById('options');
    
    // Add opened class to envelope
    envelope.classList.add('opened');
    
    // Create floating hearts animation
    createFloatingHearts();
    
    // Play romantic sound effect (optional)
    playEnvelopeOpenSound();
    
    // After envelope animation, show letter and button
    setTimeout(() => {
        envelopeContainer.classList.add('hidden');
        letterContent.classList.remove('hidden');
        options.classList.remove('hidden');
        
        // Add the cat-heart.gif
        displayCatHeart();
        
        // Create romantic atmosphere
        createRomanticAtmosphere();
        
        // Ensure music continues (or try to start if not playing)
        if (!isMusicPlaying) {
            attemptAutoPlay();
        }
    }, 600);
}

// Play envelope open sound (optional)
function playEnvelopeOpenSound() {
    // Create a soft "pop" sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        console.log('Web Audio API not supported or blocked');
    }
}

// Function to display the cat.gif initially
function displayCat() {
    var imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = ''; // Clear any existing content
    
    var catImage = new Image();
    catImage.src = 'cat.gif';
    catImage.alt = 'Cute Cat';
    catImage.className = 'cat-image';
    
    catImage.onload = function() {
        imageContainer.appendChild(catImage);
    };
    
    // Fallback in case image doesn't load
    catImage.onerror = function() {
        console.log('Cat image failed to load');
        // Add a cute text fallback
        var fallback = document.createElement('div');
        fallback.innerHTML = '🐱';
        fallback.style.fontSize = '100px';
        imageContainer.appendChild(fallback);
    };
}

// Function to display cat-heart.gif
function displayCatHeart() {
    var imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = ''; // Clear existing content
    
    var catHeartImage = new Image();
    catHeartImage.src = 'cat.gif';
    catHeartImage.alt = 'Cat with Heart';
    catHeartImage.className = 'cat-image';
    
    catHeartImage.onload = function() {
        imageContainer.appendChild(catHeartImage);
    };
    
    catHeartImage.onerror = function() {
        // Fallback if image doesn't load
        var fallback = document.createElement('div');
        fallback.innerHTML = '🐱❤️';
        fallback.style.fontSize = '80px';
        imageContainer.appendChild(fallback);
    };
}

// Function to create floating hearts
function createFloatingHearts() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            var heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.fontSize = (20 + Math.random() * 30) + 'px';
            heart.style.opacity = '0.8';
            heart.style.zIndex = '9999';
            heart.style.animation = `floatUp ${2 + Math.random() * 3}s ease-out forwards`;
            heart.style.pointerEvents = 'none';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 200);
    }
}

// Function to create romantic atmosphere
function createRomanticAtmosphere() {
    // Add subtle background color transition
    document.body.style.transition = 'background 2s ease';
    document.body.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)';
    
    // Create floating hearts effect in background
    setInterval(() => {
        if (!document.getElementById('letter-content').classList.contains('hidden')) {
            var heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = -50 + 'px';
            heart.style.fontSize = (15 + Math.random() * 20) + 'px';
            heart.style.opacity = '0.3';
            heart.style.zIndex = '1';
            heart.style.animation = `fallDown ${8 + Math.random() * 7}s linear forwards`;
            heart.style.pointerEvents = 'none';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 15000);
        }
    }, 800);
}

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes fallDown {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .cat-image {
        width: 100%;
        max-width: 300px;
        height: auto;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(255, 105, 180, 0.3);
        animation: gentleFloat 3s ease-in-out infinite;
    }
    
    @keyframes gentleFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    .music-hint {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.9);
        padding: 12px 24px;
        border-radius: 50px;
        font-family: 'Dancing Script', cursive;
        font-size: 1.2rem;
        color: #ff1493;
        box-shadow: 0 4px 20px rgba(255, 20, 147, 0.2);
        z-index: 10001;
        animation: slideUp 0.5s ease;
        border: 2px solid #ffb6c1;
        white-space: nowrap;
    }
    
    @media (max-width: 480px) {
        .music-hint {
            font-size: 1rem;
            padding: 10px 20px;
            white-space: normal;
            width: 80%;
            text-align: center;
            bottom: 20px;
        }
    }
`;

document.head.appendChild(style);

// Handle touch events for mobile
if ('ontouchstart' in window) {
    document.getElementById('envelope').addEventListener('touchstart', function(e) {
        e.preventDefault();
        openEnvelope();
    });
}

// Add a sweet surprise when button is clicked
document.addEventListener('click', function(e) {
    if (e.target.id === 'open-letter-btn') {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 200);
        
        // Create a burst of hearts
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createFloatingHearts();
            }, i * 100);
        }
    }
});

// Prevent zooming on double tap for better mobile experience
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });