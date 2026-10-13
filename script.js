
/* MAD RESTAURANT — interactive website
   Booking and contact forms are front-end demos.
*/

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
  });
});

// SAMPLE MENU DATA
// Change these sample dishes, descriptions, photos, and prices as needed.
const menuItems = [
  {
    name: "Crispy Veg Starters",
    category: "Starters",
    description: "A crunchy, flavourful start to your meal.",
    price: 149,
    photo: "photo-1541014741259-de529411b96a"
  },
  {
    name: "Paneer Tikka",
    category: "Starters",
    description: "Spiced paneer with a smoky-style flavour.",
    price: 229,
    photo: "photo-1567188040759-fb8a883dc6d8"
  },
  {
    name: "Creamy Paneer Curry",
    category: "Main Course",
    description: "A rich curry-style dish to enjoy with bread.",
    price: 249,
    photo: "photo-1631452180519-c014fe946bc7"
  },
  {
    name: "Classic Veg Thali",
    category: "Main Course",
    description: "A sample meal with a variety of flavours.",
    price: 199,
    photo: "photo-1547592180-85f173990554"
  },
  {
    name: "Chicken Biryani",
    category: "Biryani",
    description: "Aromatic rice with traditional-style spices.",
    price: 279,
    photo: "photo-1563379091339-03246963d96c"
  },
  {
    name: "Veg Biryani",
    category: "Biryani",
    description: "Fragrant rice with vegetables and spices.",
    price: 199,
    photo: "photo-1512058564366-18510be2db19"
  },
  {
    name: "Veg Hakka Noodles",
    category: "Chinese",
    description: "Stir-fried noodles with vegetables.",
    price: 179,
    photo: "photo-1585032226651-759b368d7246"
  },
  {
    name: "Chocolate Dessert",
    category: "Desserts",
    description: "A sweet treat for chocolate lovers.",
    price: 129,
    photo: "photo-1578985545062-69928b1d9587"
  },
  {
    name: "Classic Ice Cream",
    category: "Desserts",
    description: "A cool and creamy dessert.",
    price: 99,
    photo: "photo-1563805042-7684c019e1cb"
  },
  {
    name: "Fresh Lime Cooler",
    category: "Beverages",
    description: "A refreshing citrus-style drink.",
    price: 79,
    photo: "photo-1513558161293-cdaf765edfd7"
  },
  {
    name: "Cold Coffee",
    category: "Beverages",
    description: "A chilled coffee-style refreshment.",
    price: 119,
    photo: "photo-1461023058943-07fcbe16d735"
  }
];

// RENDER MENU CARDS
const menuGrid = document.getElementById("menuGrid");

function renderMenu(category = "All") {
  const items = category === "All"
    ? menuItems
    : menuItems.filter((item) => item.category === category);

  menuGrid.replaceChildren();

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "menu-card";

    const image = document.createElement("img");
    image.src =
      `https://images.unsplash.com/${item.photo}?auto=format&fit=crop&w=700&q=80`;
    image.alt = item.name;
    image.loading = "lazy";
    image.width = 700;
    image.height = 450;

    image.addEventListener("error", () => {
      image.hidden = true;
    }, { once: true });

    const body = document.createElement("div");
    body.className = "menu-card-body";

    const top = document.createElement("div");
    top.className = "menu-card-top";

    const title = document.createElement("h3");
    title.textContent = item.name;

    const price = document.createElement("span");
    price.className = "menu-price";
    price.textContent = `₹${item.price}`;

    const description = document.createElement("p");
    description.textContent = item.description;

    const tag = document.createElement("span");
    tag.className = "menu-tag";
    tag.textContent = item.category;

    top.append(title, price);
    body.append(top, description, tag);
    card.append(image, body);
    menuGrid.append(card);
  });
}

renderMenu();

// MENU CATEGORY FILTERS
document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((filter) => {
      filter.classList.remove("active");
      filter.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    renderMenu(button.dataset.category);
  });
});

// BOOKING DATE: TODAY OR A FUTURE DATE
const bookingDate = document.getElementById("bookingDate");
const now = new Date();

bookingDate.min = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0")
].join("-");

// RESERVATION FORM — VALIDATION DEMO ONLY
const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  bookingMessage.textContent = "";

  if (!bookingForm.reportValidity()) return;

  if (bookingDate.value < bookingDate.min) {
    bookingMessage.textContent = "Please choose today or a future date.";
    bookingDate.focus();
    return;
  }

  const phone = document.getElementById("bookingPhone");
  const digits = phone.value.replace(/\D/g, "");

  if (digits.length < 8 || digits.length > 15) {
    bookingMessage.textContent =
      "Please enter a valid phone number with 8–15 digits.";
    phone.focus();
    return;
  }

  bookingMessage.textContent =
    "Demo only: your form passed validation, but no reservation was sent. Please contact the restaurant to arrange your booking.";
});

// CONTACT FORM — VALIDATION DEMO ONLY
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");
const contactMethod = document.getElementById("contactMethod");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  contactStatus.textContent = "";

  if (!contactForm.reportValidity()) return;

  const value = contactMethod.value.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const digits = value.replace(/\D/g, "");
  const validPhone =
    /^[0-9+() -]{8,18}$/.test(value) &&
    digits.length >= 8 &&
    digits.length <= 15;

  if (!validEmail && !validPhone) {
    contactStatus.textContent =
      "Enter a valid email address or phone number.";
    contactMethod.focus();
    return;
  }

  contactStatus.textContent =
    "Demo only: your form passed validation, but your message was not sent or stored.";
});

// SCROLL REVEAL ANIMATIONS
const revealElements = document.querySelectorAll(".reveal");

if (
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
  !("IntersectionObserver" in window)
) {
  revealElements.forEach((element) => element.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
}

// BACK-TO-TOP BUTTON
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 350);
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// CONFIGURE REAL CONTACT LINKS BEFORE PUBLISHING
// Use the country code plus phone number, digits only, for WhatsApp.
// Example format: 91XXXXXXXXXX
const WHATSAPP_NUMBER = "";
const GOOGLE_MAPS_URL = "";

const whatsappLink = document.getElementById("whatsappLink");

whatsappLink.addEventListener("click", (event) => {
  if (!/^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
    event.preventDefault();
    alert("WhatsApp is not configured yet. Add the restaurant's real number in script.js.");
    return;
  }

  whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}`;
  whatsappLink.target = "_blank";
  whatsappLink.rel = "noopener noreferrer";
});

const mapLink = document.getElementById("mapLink");

mapLink.addEventListener("click", (event) => {
  if (
    !GOOGLE_MAPS_URL ||
    !/^https:\/\/(www\.)?google\.[^/]+\/maps/.test(GOOGLE_MAPS_URL)
  ) {
    event.preventDefault();
    alert("Google Maps is not configured yet. Add the restaurant's verified Maps URL in script.js.");
    return;
  }

  mapLink.href = GOOGLE_MAPS_URL;
  mapLink.target = "_blank";
  mapLink.rel = "noopener noreferrer";
});

// FOOTER YEAR
document.getElementById("currentYear").textContent =
  new Date().getFullYear();
