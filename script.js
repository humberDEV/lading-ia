import { db, collection, addDoc, serverTimestamp } from './firebase-config.js';

// Simple interaction scripts for TikTok audience
document.addEventListener("DOMContentLoaded", () => {
    // Add haptic feedback simulation if supported (standard vibration API for mobile)
    const ctaBtn = document.getElementById('cta-btn');

    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            if (navigator.vibrate) {
                navigator.vibrate([50, 50, 50]);
            }
        });
    }

    // Modal logic
    const modal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal clicking outside the card
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    // Waitlist Form Submission
    const waitlistForm = document.getElementById('waitlist-form');
    const formMessage = document.getElementById('form-message');
    const emailInput = document.getElementById('email-input');

    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = emailInput.value;
            const originalBtnText = ctaBtn.innerHTML;

            ctaBtn.innerHTML = '<span class="btn-text">Cargando...</span>';
            ctaBtn.disabled = true;

            try {
                await addDoc(collection(db, "mails"), {
                    email: email,
                    timestamp: serverTimestamp()
                });

                // Mostrar modal de éxito
                modal.style.display = 'flex';
                waitlistForm.reset();

            } catch (error) {
                console.error("Error al guardar en Firebase:", error);
                formMessage.style.display = 'block';
                formMessage.style.color = '#ef4444';
                formMessage.textContent = 'Hubo un error. Inténtalo de nuevo.';
            } finally {
                ctaBtn.innerHTML = originalBtnText;
                ctaBtn.disabled = false;
            }
        });
    }
});
