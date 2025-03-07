document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date');
    const timeSlotsContainer = document.getElementById('time-slots');
    const saveButton = document.getElementById('save-button');

    const startTime = 9.5; // 9h30
    const endTime = 21.5; // 21h30
    const slotDuration = 1.5; // 1h30

    function generateTimeSlots() {
        timeSlotsContainer.innerHTML = '';
        let currentTime = startTime;
        while (currentTime + slotDuration <= endTime) {
            const startHour = Math.floor(currentTime);
            const startMinute = (currentTime - startHour) * 60;
            const endHour = Math.floor(currentTime + slotDuration);
            const endMinute = ((currentTime + slotDuration) - endHour) * 60;

            const slot = document.createElement('div');
            slot.classList.add('time-slot');
            slot.innerHTML = `
                <input type="checkbox" id="slot-${currentTime}">
                <label for="slot-${currentTime}">${formatTime(startHour, startMinute)} - ${formatTime(endHour, endMinute)}</label>
            `;
            timeSlotsContainer.appendChild(slot);
            currentTime += slotDuration;
        }
    }

    function formatTime(hour, minute) {
        return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    }

    function saveSlots() {
        const date = dateInput.value;
        const slots = Array.from(timeSlotsContainer.querySelectorAll('input[type="checkbox"]'))
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.id);

        const savedData = JSON.parse(localStorage.getItem('padelSlots')) || {};
        savedData[date] = slots;
        localStorage.setItem('padelSlots', JSON.stringify(savedData));
        alert('Créneaux enregistrés !');
    }

    function loadSlots() {
        const date = dateInput.value;
        const savedData = JSON.parse(localStorage.getItem('padelSlots')) || {};
        const slots = savedData[date] || [];

        slots.forEach(slotId => {
            const checkbox = document.getElementById(slotId);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }

    dateInput.addEventListener('change', () => {
        generateTimeSlots();
        loadSlots();
    });

    saveButton.addEventListener('click', saveSlots);

    // Initial generation of time slots
    generateTimeSlots();
});
