document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const flightOptions = document.getElementById("flightOptions");
  const seatSelection = document.getElementById("seatSelection");
  const seatMap = document.querySelector(".seat-map");
  const confirmBtn = document.getElementById("confirmBtn");
  const confirmationMsg = document.getElementById("confirmationMsg");

  let selectedFlight = null;
  let selectedPrice = 0;
  let selectedSeats = [];
  const TOTAL_SEATS = 30;
  const BOOKED_SEATS = [3, 5, 8, 13];

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    flightOptions.classList.remove("hidden");
    seatSelection.classList.add("hidden");
    confirmationMsg.classList.add("hidden");
  });

  document.querySelectorAll(".book-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".flight-card");
      selectedFlight = card.dataset.flight;
      selectedPrice = parseInt(card.dataset.price);
      selectedSeats = [];

      renderSeats();
      seatSelection.classList.remove("hidden");
      confirmationMsg.classList.add("hidden");
    });
  });

  function renderSeats() {
    seatMap.innerHTML = "";
    for (let i = 1; i <= TOTAL_SEATS; i++) {
      const seat = document.createElement("div");
      seat.classList.add("seat");
      seat.textContent = i;

      if (BOOKED_SEATS.includes(i)) {
        seat.classList.add("booked");
      } else {
        seat.addEventListener("click", () => toggleSeat(seat, i));
      }

      seatMap.appendChild(seat);
    }
  }

  function toggleSeat(seatEl, seatNum) {
    if (selectedSeats.includes(seatNum)) {
      selectedSeats = selectedSeats.filter((n) => n !== seatNum);
      seatEl.classList.remove("selected");
    } else {
      selectedSeats.push(seatNum);
      seatEl.classList.add("selected");
    }
  }

  confirmBtn.addEventListener("click", () => {
    if (!selectedFlight || selectedSeats.length === 0) {
      alert("Please select a seat.");
      return;
    }

    confirmationMsg.classList.remove("hidden");
    confirmationMsg.innerHTML = `
      <strong>Booking Confirmed!</strong><br>
      Flight: ${selectedFlight}<br>
      Seats: ${selectedSeats.join(", ")}<br>
      Total: ₹${selectedSeats.length * selectedPrice}
    `;

    BOOKED_SEATS.push(...selectedSeats);
    renderSeats();
    selectedSeats = [];
  });
});
