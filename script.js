const tripForm = document.querySelector('#trip-form');
const formMessage = document.querySelector('#form-message');
const tripGrid = document.querySelector('#trip-grid');
const tripHeading = document.querySelector('#add-trip-heading');
const submitButton = document.querySelector('.submit-button');
const photoInput = document.querySelector('#trip-photo');
const photoPreview = document.querySelector('#trip-photo-preview');
let editingTripId = null;

photoInput.addEventListener('change', function () {
  const selectedFile = photoInput.files[0];

  if (!selectedFile || !selectedFile.type.startsWith('image/')) {
    photoPreview.removeAttribute('src');
    photoPreview.hidden = true;
    return;
  }

  const fileReader = new FileReader();

  fileReader.addEventListener('load', function () {
    photoPreview.src = fileReader.result;
    photoPreview.hidden = false;
  });

  fileReader.readAsDataURL(selectedFile);
});

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
    id: editingTripId || Date.now(),
    title: title,
    destination: destination,
    date: date,
    notes: notes
  };

  const savedTrips = JSON.parse(localStorage.getItem('trips')) || [];

  if (editingTripId) {
    const tripIndex = savedTrips.findIndex(function (savedTrip) {
      return savedTrip.id === editingTripId;
    });

    if (tripIndex !== -1) {
      savedTrips[tripIndex] = trip;
    }
  } else {
    savedTrips.push(trip);
  }

  localStorage.setItem('trips', JSON.stringify(savedTrips));

  console.log(editingTripId ? 'Trip updated:' : 'Trip created:', trip);

  formMessage.textContent = editingTripId
    ? 'Your trip was updated successfully.'
    : 'Your trip was added successfully.';

  tripForm.reset();
  photoPreview.removeAttribute('src');
  photoPreview.hidden = true;
  editingTripId = null;
  tripHeading.textContent = 'Add a Trip';
  submitButton.textContent = 'Save trip';
  displayTrips();
});

function displayTrips() {
  const savedTrips = JSON.parse(localStorage.getItem('trips')) || [];

  tripGrid.innerHTML = '';

  if (savedTrips.length === 0) {
    tripGrid.innerHTML = '<p class="empty-state">No journeys yet. Start by adding your first trip.</p>';
    return;
  }

  savedTrips.forEach(function (trip) {
    const tripCard = document.createElement('article');

    tripCard.classList.add('trip-card');

    tripCard.innerHTML = `
      <h3>${trip.title}</h3>
      <p><strong>Destination:</strong> ${trip.destination}</p>
      <p><strong>Date:</strong> ${trip.date}</p>
      <p>${trip.notes}</p>
      <button type="button" class="submit-button edit-button" data-trip-id="${trip.id}">Edit</button>
      <button type="button" class="submit-button edit-button delete-button" data-trip-id="${trip.id}">Delete</button>
    `;

    tripCard.querySelector('.edit-button').addEventListener('click', function () {
      const tripToEdit = savedTrips.find(function (savedTrip) {
        return String(savedTrip.id) === this.dataset.tripId;
      }, this);

      if (!tripToEdit) {
        return;
      }

      editingTripId = tripToEdit.id;
      document.querySelector('#trip-title').value = tripToEdit.title;
      document.querySelector('#trip-destination').value = tripToEdit.destination;
      document.querySelector('#trip-date').value = tripToEdit.date;
      document.querySelector('#trip-notes').value = tripToEdit.notes;
      photoInput.value = '';
      photoPreview.removeAttribute('src');
      photoPreview.hidden = true;
      tripHeading.textContent = 'Edit Trip';
      submitButton.textContent = 'Update trip';
      formMessage.textContent = '';
      document.querySelector('#add-trip').scrollIntoView({ behavior: 'smooth' });
    });

    tripCard.querySelector('.delete-button').addEventListener('click', function () {
      const tripToDelete = savedTrips.find(function (savedTrip) {
        return String(savedTrip.id) === this.dataset.tripId;
      }, this);

      if (!tripToDelete || !window.confirm('Are you sure you want to delete this trip?')) {
        return;
      }

      const remainingTrips = savedTrips.filter(function (savedTrip) {
        return String(savedTrip.id) !== this.dataset.tripId;
      }, this);

      localStorage.setItem('trips', JSON.stringify(remainingTrips));
      displayTrips();
    });

    tripGrid.appendChild(tripCard);
  });
}

displayTrips();