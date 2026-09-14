const tripForm = document.querySelector('#trip-form');
const formMessage = document.querySelector('#form-message');

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