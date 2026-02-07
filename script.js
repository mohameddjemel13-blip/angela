/* ============================================
   VARIABLES GLOBALES
   ============================================ */
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const questionScreen = document.getElementById('question-screen');
const celebrationScreen = document.getElementById('celebration-screen');
const escapeMessage = document.getElementById('escape-message');
const floatingHeartsContainer = document.getElementById('floating-hearts');
const confettiContainer = document.getElementById('confetti-container');
const risingHeartsContainer = document.getElementById('rising-hearts');

const escapeMessages = [
    "Hehe, tu ne peux pas m'attraper !",
    "Essaie encore... ou pas !",
    "Le OUI est juste la... clique dessus !",
    "Je suis trop rapide pour toi !",
    "Allez, dis OUI !",
    "Tu vas te fatiguer avant moi !",
    "Angela, sois gentille, dis OUI !",
    "Je peux faire ca toute la journee !",
    "Le destin veut que tu dises OUI !",
    "Pourquoi resister ? Dis OUI !"
];

let messageIndex = 0;
let hasEscaped = false;
let yesScale = 1;

// position contrôlée du bouton NON
let posX = 0;
let posY = 0;

/* ============================================
   COEURS FLOTTANTS EN FOND
   ============================================ */
function createFloatingHearts() {
    const hearts = ['&#10084;', '&#9825;', '&#10084;'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heart.style.animationDelay = (Math.random() * 5) + 's';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        floatingHeartsContainer.appendChild(heart);
    }
}

/* ============================================
   POSITION INITIALE FIXE
   ============================================ */
function initNoButtonPosition() {
    const rect = btnNo.getBoundingClientRect();
    posX = rect.left;
    posY = rect.top;
}

/* ============================================
   BOUTON NON QUI S'ECHAPPE (FIX DEFINITIF)
   ============================================ */
function moveButton() {
    const btnWidth = btnNo.offsetWidth;
    const btnHeight = btnNo.offsetHeight;

    const margin = 10;
    const minX = margin;
    const minY = margin;
    const maxX = window.innerWidth - btnWidth - margin;
    const maxY = window.innerHeight - btnHeight - margin;

    // déplacement court (rayon limité)
    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 60;

    posX += Math.cos(angle) * distance;
    posY += Math.sin(angle) * distance;

    // clamp STRICT
    posX = Math.max(minX, Math.min(posX, maxX));
    posY = Math.max(minY, Math.min(posY, maxY));

    if (!hasEscaped) {
        hasEscaped = true;
        btnNo.classList.add('btn-no-escaped');
        btnNo.style.position = 'fixed';
    }

    btnNo.style.left = posX + 'px';
    btnNo.style.top = posY + 'px';

    // grossir le OUI
    yesScale += 0.4;
    btnYes.style.transform = 'scale(' + yesScale + ')';

    // message
    escapeMessage.textContent = escapeMessages[messageIndex];
    escapeMessage.style.animation = 'none';
    escapeMessage.offsetHeight;
    escapeMessage.style.animation = 'wiggle 0.5s ease-in-out';

    messageIndex = (messageIndex + 1) % escapeMessages.length;
}

btnNo.addEventListener('mouseenter', moveButton);
btnNo.addEventListener('touchstart', function(e) {
    e.preventDefault();
    moveButton();
});

/* ============================================
   BOUTON OUI
   ============================================ */
btnYes.addEventListener('click', function() {
    questionScreen.style.display = 'none';
    btnNo.style.display = 'none';
    
    celebrationScreen.classList.remove('hidden');
    
    createConfetti();
    createRisingHearts();
    
    setInterval(createRisingHearts, 2000);
});

/* ============================================
   CONFETTIS
   ============================================ */
function createConfetti() {
    const colors = ['#ec4899', '#f472b6', '#fb7185', '#fda4af', '#fecdd3', '#ffffff'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';
            
            if (Math.random() > 0.5) confetti.style.borderRadius = '50%';
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

/* ============================================
   COEURS QUI MONTENT
   ============================================ */
function createRisingHearts() {
    const hearts = ['&#10084;', '&#9825;', '&#10084;&#65039;'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'rising-heart';
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.color = Math.random() > 0.5 ? '#ffffff' : '#fecdd3';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
            heart.style.animationDelay = (Math.random() * 0.5) + 's';
            
            risingHeartsContainer.appendChild(heart);
            
            setTimeout(() => heart.remove(), 6000);
        }, i * 100);
    }
}

/* ============================================
   INIT
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    initNoButtonPosition(); // IMPORTANT
});
