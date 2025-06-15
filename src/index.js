// Get elements from the HTML
const form = document.getElementById("guest-form");
const guestList = document.getElementById("guest-list");
const nameInput = document.getElementById("guest-name");
const categorySelect = document.getElementById("guest-category");

// Get guests from local storage, or start with an empty list
let guests = JSON.parse(localStorage.getItem("guests")) || [];

// When the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from refreshing

  const name = nameInput.value.trim(); // get the name entered
  const category = categorySelect.value; // get the selected category

  // Check if the guest list is full
  if (guests.length >= 10) {
    alert("Guest list is full! You can only add up to 10 people.");
    return;
  }

  // Create a new guest object
  const newGuest = {
    id: Date.now(), // unique ID based on time
    name: name,
    category: category,
    attending: false, // default to "Not Attending"
    timeAdded: new Date().toLocaleTimeString() // time they were added
  };

  // Add to the guest list
  guests.push(newGuest);

  // Save and show the updated list
  saveGuests();
  showGuests();

  // Clear the form
  form.reset();
});

// Show the guests on the page
function showGuests() {
  guestList.innerHTML = ""; // clear old list

  // Go through each guest and create a list item
  guests.forEach(function (guest) {
    const li = document.createElement("li");
    li.className = "category-" + guest.category; // add class for color

    // Show guest name, RSVP status, and time added
    const info = document.createElement("span");
    info.textContent = guest.name + " - (" + 
      (guest.attending ? "Attending" : "Not Attending") + 
      ") - [" + guest.timeAdded + "]";

    // Button to toggle RSVP
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle RSVP";
    toggleBtn.addEventListener("click", function () {
      guest.attending = !guest.attending; // switch true/false
      saveGuests();
      showGuests();
    });

    // Button to remove guest
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function () {
      guests = guests.filter(function (g) {
        return g.id !== guest.id;
      });
      saveGuests();
      showGuests();
    });

    // Button to edit guest name
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
      const newName = prompt("Enter new name:", guest.name);
      if (newName && newName.trim()) {
        guest.name = newName.trim();
        saveGuests();
        showGuests();
      }
    });

    // Add everything to the list item
    li.appendChild(info);
    li.appendChild(toggleBtn);
    li.appendChild(editBtn);
    li.appendChild(removeBtn);

    // Add the list item to the guest list
    guestList.appendChild(li);
  });
}

// Save the guests to local storage
function saveGuests() {
  localStorage.setItem("guests", JSON.stringify(guests));
}

// Show guests when the page first loads
showGuests();
