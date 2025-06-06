window.addEventListener("scroll", () => {
  const steps = document.querySelectorAll(".step");
  steps.forEach((step) => {
    const rect = step.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 100;
    step.classList.toggle("active", isVisible);
  });
});

const startDate = new Date("2020-03-01");
const endDate = new Date("2025-01-01");
const totalDuration = endDate - startDate;

function updateScrollDate() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = Math.min(scrollTop / docHeight, 1);
  const currentDate = new Date(startDate.getTime() + scrollPercent * totalDuration);

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  document.getElementById("current-date").textContent = `${day}/${month}/${year}`;
}

window.addEventListener("scroll", updateScrollDate);
window.addEventListener("load", updateScrollDate); // para que se muestre al cargar

const map = L.map('map', {
    zoomControl: false,
    scrollWheelZoom: false
  }).setView([20, 0], 1.5); // Mapa global al principio
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  
  const wuhan = [30.5928, 114.3055];
  const mapCaption = document.getElementById("map-caption");
  const mapSection = document.getElementById("map-zoom");
  
  let zoomCompleted = false;
  
  window.addEventListener("scroll", () => {
    if (zoomCompleted) return; // si ya hizo el zoom, no hacemos nada
  
    const rect = mapSection.getBoundingClientRect();
    const windowCenter = window.innerHeight / 2;
    const mapCenter = rect.top + rect.height / 2;
    const delta = Math.abs(mapCenter - windowCenter);
  
    const centerThreshold = 80;
    const isCentered = delta < centerThreshold;
  
    if (isCentered) {
      const scrollable = rect.height * 1.2;
      const fromTop = windowCenter - rect.top;
      const progress = Math.min(1, Math.max(0, fromTop / scrollable));
  
      const minZoom = 1.5;
      const maxZoom = 7;
      const zoomLevel = minZoom + (maxZoom - minZoom) * progress;
  
      map.setView(wuhan, zoomLevel);
  
      if (progress >= 1) {
        zoomCompleted = true;
        map.setView(wuhan, maxZoom); // fijamos el destino
        mapCaption.classList.add("show");
        mapCaption.classList.remove("hidden");
      }
    }
  });
  
  