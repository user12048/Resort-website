document.addEventListener('DOMContentLoaded', function() {
  const paymentItems = document.getElementById('payment-items');
  const paymentTotal = document.getElementById('payment-total');
  const checkoutButton = document.getElementById('checkout-button');
  const addToPayment = document.getElementById('add-to-payment');
  const nightsInput = document.getElementById('room-nights');
  const guestsInput = document.getElementById('room-guests');

  const items = [];

  function updateSummary() {
    if (!paymentItems || !paymentTotal || !checkoutButton) {
      return;
    }

    if (items.length === 0) {
      paymentItems.textContent = 'No rooms added yet.';
      paymentTotal.textContent = '0';
      checkoutButton.disabled = true;
      return;
    }

    paymentItems.innerHTML = '';
    const total = items.reduce((sum, item) => {
      const lineTotal = item.price * item.nights;
      const line = document.createElement('div');
      line.className = 'payment-item';
      line.textContent = `${item.name} · ${item.nights} night(s) · ${item.guests} guest(s) · $${lineTotal}`;
      paymentItems.appendChild(line);
      return sum + lineTotal;
    }, 0);

    paymentTotal.textContent = total;
    checkoutButton.disabled = total === 0;
  }

  if (addToPayment && nightsInput && guestsInput && checkoutButton && paymentItems && paymentTotal) {
    addToPayment.addEventListener('click', function() {
      const selectedRoom = document.querySelector('input[name="room"]:checked');
      const nights = Math.max(1, parseInt(nightsInput.value, 10) || 1);
      const guests = Math.max(1, parseInt(guestsInput.value, 10) || 1);

      if (!selectedRoom) {
        return;
      }

      items.push({
        name: selectedRoom.value,
        price: Number(selectedRoom.dataset.price),
        nights,
        guests
      });

      updateSummary();
    });

    checkoutButton.addEventListener('click', function() {
      if (items.length === 0) {
        return;
      }

      alert('Haha, you aren\'t actually getting a room.');
    });
  }

  const reservationForm = document.querySelector('.reservation-form');
  if (reservationForm) {
    reservationForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const name = reservationForm.querySelector('[name="name"]').value.trim();
      const room = reservationForm.querySelector('[name="room"]').value.trim();
      const datetime = reservationForm.querySelector('[name="datetime"]').value;
      const people = reservationForm.querySelector('[name="people"]').value;
      const notes = reservationForm.querySelector('[name="notes"]').value.trim();

      if (!name || !room || !datetime || !people) {
        alert('Please fill in all required reservation fields before sending.');
        return;
      }

      alert(
        'Reservation sent!\n' +
        'Name: ' + name + '\n' +
        'Room: ' + room + '\n' +
        'Date and time: ' + datetime + '\n' +
        'Number of people: ' + people +
        (notes ? '\nNotes: ' + notes : '')
      );

      reservationForm.reset();
    });
  }

  updateSummary();
});
