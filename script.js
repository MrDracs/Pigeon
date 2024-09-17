const pigeon = document.getElementById('pigeon');
const clickHere = document.getElementById('click-here');
const messageContainer = document.getElementById('message-container');
const explosionEmoji = document.getElementById('explosion-emoji');
const message = document.getElementById('message');
const button = document.getElementById('btn');

// Music tracks
const music = new Audio('assets/music.mp3');
const bankai = new Audio('assets/bankai.mp3');
const dandadan = new Audio('assets/dandadan.mp3');

let size = 4;
let clickSpeed = 100; // Controls the rate of growth based on click speed
let lastClickTime = Date.now();
let growing = true;

pigeon.addEventListener('click', () => {
    if (!growing) return;

    clickHere.style.display = 'inline';
    music.play();
    music.loop = true; // Loop the track during growth

    const currentTime = Date.now();
    const clickInterval = currentTime - lastClickTime;

    // Adjust growth rate based on click speed
    if (clickInterval < 200) {
        size += 1;
    } else {
        size += 0.5;
    }

    // Apply fade effect to music volume as the pigeon grows
    music.volume = Math.min(1, size / 30); // Fade from 0 to 1 volume

    // Apply a "stomp" effect (scale down and back up quickly)
    pigeon.style.transform = `scale(0.8)`;
    setTimeout(() => {
        pigeon.style.transform = `scale(1)`;
        pigeon.style.fontSize = size + 'vw';
        clickHere.style.fontSize = size / 2 + 'vw';
    }, 100);

    // When pigeon reaches max size (pause growth and play "Bankai")
    if (size >= 30) {
        pauseGrowthAndPlayBankai();
    }

    lastClickTime = currentTime;
});

function pauseGrowthAndPlayBankai() {
    growing = false;
    pigeon.style.fontSize = '300px';
    clickHere.style.display = 'none'; // Hide click here text

    // Stop the music and prepare for the explosion
    music.pause();
    music.currentTime = 0; // Reset music to start
    setTimeout(() => {
        // Add vibrate effect and play "Bankai"
        pigeon.classList.add('vibrate');
        bankai.play();
        bankai.volume = 1;

        bankai.addEventListener('ended', () => {
            pigeon.classList.remove('vibrate');
            explodePigeon(); // After "Bankai" track ends, explode
        });
    }, 1000); // 1-second pause before playing "Bankai"
}

function explodePigeon() {
    pigeon.style.display = 'none';
    createConfetti();
    startRGBBackground(); // Start RGB background transition

    // Play "Dandadan" for the rest of the time
    dandadan.play();
    dandadan.volume = 1;
    dandadan.loop = true; // Keep playing

    // Show message and button after a short delay
    setTimeout(() => {
        showMessage();
    }, 1000); // Adjust timing if needed
}

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = randomColor();
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = Math.random() * window.innerHeight + 'px';
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 1500);  // Remove confetti after animation
    }
}

function randomColor() {
    const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#900C3F', '#581845'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function startRGBBackground() {
    document.body.classList.add('rgb-active'); // Apply RGB background transition
}

function showMessage() {
    messageContainer.style.display = 'block'; // Ensure container is visible
    button.style.display = 'inline-block'; // Show button
    button.addEventListener('click', () => {
        window.open('https://wa.me/917982224789?text=I%20killed%20it');
    });
}
