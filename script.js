const tripForm = document.querySelector('#trip-form');
const formMessage = document.querySelector('#form-message');
const tripGrid = document.querySelector('#trip-grid');

tripForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(tripForm);

  const title = formData.get('title').trim();
  const destination = formData.get('destination').trim();
  const date = formData.get('date');
  const notes = formData.get('notes').trim();

  if (!title || !destination || !date || !notes) {
    formMessage.textContent = 'Please complete all fields before saving your trip.';
    return;
  }

  const trip = {
    id: Date.now(),
    title: title,
    destination: destination,
    date: date,
    notes: notes
  };

const savedTrips = JSON.parse(localStorage.getItem('trips')) || [];

savedTrips.push(trip);

localStorage.setItem('trips', JSON.stringify(savedTrips));

console.log('Trip created:', trip);

formMessage.textContent = 'Your trip was added successfully.';

tripForm.reset();
});
function displayTrips() {
  const savedTrips = JSON.parse(localStorage.getItem('trips')) || [];

  tripGrid.innerHTML = '';

  savedTrips.forEach(function (trip) {
    const tripCard = document.createElement('article');

    tripCard.classList.add('trip-card');

    tripCard.innerHTML = `
      <h3>${trip.title}</h3>
      <p><strong>Destination:</strong> ${trip.destination}</p>
      <p><strong>Date:</strong> ${trip.date}</p>
      <p>${trip.notes}</p>
    `;

    tripGrid.appendChild(tripCard);
  });
}

displayTrips();