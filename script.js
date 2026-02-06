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

// Messages droles quand le bouton NON s'echappe
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
   BOUTON NON QUI S'ECHAPPE
   ============================================ */
function moveButton() {
    const btnRect = btnNo.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;
    
    // Marge de securite depuis les bords de l'ecran
    const margin = 20;
    
    // Limites de l'ecran
    const minX = margin;
    const minY = margin;
    const maxX = window.innerWidth - btnWidth - margin;
    const maxY = window.innerHeight - btnHeight - margin;
    
    // Position actuelle du bouton
    const currentX = btnRect.left;
    const currentY = btnRect.top;
    
    // Rayon maximum de deplacement (150px)
    const maxRadius = 150;
    
    // Generer un angle aleatoire et une distance aleatoire dans le rayon
    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * (maxRadius - 80); // entre 80 et 150px
    
    let newX = currentX + Math.cos(angle) * distance;
    let newY = currentY + Math.sin(angle) * distance;
    
    // Clamper pour rester dans l'ecran
    newX = Math.max(minX, Math.min(newX, maxX));
    newY = Math.max(minY, Math.min(newY, maxY));
    
    // Appliquer la position fixe
    if (!hasEscaped) {
        hasEscaped = true;
        btnNo.classList.add('btn-no-escaped');
    }
    btnNo.style.position = 'fixed';
    btnNo.style.left = newX + 'px';
    btnNo.style.top = newY + 'px';
    
    // Afficher un message drole
    escapeMessage.textContent = escapeMessages[messageIndex];
    escapeMessage.style.animation = 'none';
    escapeMessage.offsetHeight; // Force reflow
    escapeMessage.style.animation = 'wiggle 0.5s ease-in-out';
    
    messageIndex = (messageIndex + 1) % escapeMessages.length;
}

// Evenements pour le bouton NON (souris et touch)
btnNo.addEventListener('mouseenter', moveButton);
btnNo.addEventListener('touchstart', function(e) {
    e.preventDefault();
    moveButton();
});

/* ============================================
   BOUTON OUI - CELEBRATION
   ============================================ */
btnYes.addEventListener('click', function() {
    // Cacher l'ecran de question
    questionScreen.style.display = 'none';
    btnNo.style.display = 'none';
    
    // Afficher l'ecran de celebration
    celebrationScreen.classList.remove('hidden');
    
    // Lancer les animations
    createConfetti();
    createRisingHearts();
    
    // Continuer a creer des coeurs
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
            
            // Forme aleatoire
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }
            
            confettiContainer.appendChild(confetti);
            
            // Supprimer apres l'animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
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
            
            // Supprimer apres l'animation
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, i * 100);
    }
}

/* ============================================
   INITIALISATION
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
});
