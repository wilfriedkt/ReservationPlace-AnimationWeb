document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('multi-step-form');
    const steps = form.querySelectorAll('.form-step');
    const nextButtons = form.querySelectorAll('.next-step');
    const prevButtons = form.querySelectorAll('.prev-step');
    const eventCards = document.querySelectorAll('.event-card');
    const eventSelect = document.getElementById('event-select');

    // Sélection d'événement via les cartes
    eventCards.forEach(card => {
        card.addEventListener('click', () => {
            const eventName = card.getAttribute('data-event');
            eventSelect.value = eventName;
        });
    });

    // Navigation entre les étapes
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = button.closest('.form-step');
            const nextStep = currentStep.nextElementSibling;
            
            // Validation simple
            const inputs = currentStep.querySelectorAll('input, select');
            let isValid = true;
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    isValid = false;
                    input.reportValidity();
                }
            });

            if (isValid) {
                currentStep.classList.remove('active');
                nextStep.classList.add('active');
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = button.closest('.form-step');
            const prevStep = currentStep.previousElementSibling;
            
            currentStep.classList.remove('active');
            prevStep.classList.add('active');
        });
    });

    // Soumission du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Masquer les étapes précédentes
        steps.forEach(step => {
            if (step.id !== 'step-confirmation') {
                step.classList.remove('active');
            }
        });

    });
});
function generateCalendar() {
    const calendar = document.querySelector('.calendar');
    const weekdays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Créer les en-têtes des jours
    weekdays.forEach(day => {
        const dayEl = document.createElement('div');
        dayEl.textContent = day;
        dayEl.classList.add('calendar-day');
        calendar.appendChild(dayEl);
    });

    // Générer les jours du mois
    for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.textContent = i;
        dayEl.classList.add('calendar-day');
        
        // Simuler des jours disponibles
        if ([5, 10, 15, 20, 25].includes(i)) {
            dayEl.classList.add('available');
        }

        calendar.appendChild(dayEl);
    }
}

// Initialiser le calendrier
generateCalendar();


// load
const loader = document.getElementById('loader');
const payButton = document.getElementById('payButton');
const successMessage = document.getElementById('step-confirmation');

payButton.addEventListener('click', () => {
payButton.style.display = 'none'; // Cacher le bouton
loader.style.display = 'block';  // Afficher le loader

setTimeout(() => {
    loader.style.display = 'none'; // Cacher le loader
    successMessage.style.display = 'block'; // Afficher le message
}, 3000); // Délai de 3 secondes
});