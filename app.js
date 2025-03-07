const startTime = 9.5; // 9h30
const endTime = 21.5; // 21h30
const slotDuration = 1.5; // 1h30 par créneau

// Fonction pour générer les créneaux horaires
function generateTimeSlots(date) {
  const slots = [];
  let currentTime = startTime;

  while (currentTime + slotDuration <= endTime) {
    const startHour = Math.floor(currentTime);
    const startMinute = Math.round((currentTime % 1) * 60);
    const endHour = Math.floor(currentTime + slotDuration);
    const endMinute = Math.round(((currentTime + slotDuration) % 1) * 60);
    
    const slot = {
      start: `${startHour}:${startMinute < 10 ? '0' + startMinute : startMinute}`,
      end: `${endHour}:${endMinute < 10 ? '0' + endMinute : endMinute}`,
      reserved: false,
    };
    slots.push(slot);
    currentTime += slotDuration;
  }

  return slots;
}

// Fonction pour afficher les créneaux horaires
function displayTimeSlots(slots) {
  const slotsContainer = document.getElementById('time-slots');
  slotsContainer.innerHTML = ''; // Clear previous slots
  slots.forEach((slot, index) => {
    const slotElement = document.createElement('div');
    slotElement.className = 'time-slot';
    slotElement.innerHTML = `
      <p>${slot.start} - ${slot.end}</p>
      <button onclick="reserveSlot(${index})" ${slot.reserved ? 'disabled' : ''}>Réserver</button>
    `;
    slotsContainer.appendChild(slotElement);
  });
}

// Fonction de réservation
function reserveSlot(index) {
  // Logic to mark slot as reserved (store in Firestore or localStorage)
  alert('Créneau réservé !');
}

// Ajout d'un écouteur sur le changement de date
document.getElementById('date').addEventListener('change', function() {
  const date = this.value;
  if (date) {
    const timeSlots = generateTimeSlots(date);
    displayTimeSlots(timeSlots);
  }
});
