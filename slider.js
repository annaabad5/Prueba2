document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;

  let currentIndex = 1;

  // Clonar primera y última slide
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[totalSlides - 1].cloneNode(true);

  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, slides[0]);

  const allSlides = document.querySelectorAll(".slide");
  const slideWidth = slides[0].clientWidth;
  slider.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

  const nextBtn = document.getElementById("next_btn");
  const prevBtn = document.getElementById("prev_btn");

  function moveToSlide(index) {
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${slideWidth * index}px)`;
    currentIndex = index;
  }

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentIndex >= allSlides.length - 1) return;
    moveToSlide(currentIndex + 1);
  });

  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentIndex <= 0) return;
    moveToSlide(currentIndex - 1);
  });

  slider.addEventListener("transitionend", () => {
    if (allSlides[currentIndex].classList.contains("f1") && currentIndex === allSlides.length - 1) {
      slider.style.transition = "none";
      currentIndex = 1;
      slider.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }

    if (allSlides[currentIndex].classList.contains("f5") && currentIndex === 0) {
      slider.style.transition = "none";
      currentIndex = totalSlides;
      slider.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
  });

  // Manejo de redimensionado
  window.addEventListener("resize", () => {
    const newSlideWidth = slides[0].clientWidth;
    slider.style.transition = "none";
    slider.style.transform = `translateX(-${newSlideWidth * currentIndex}px)`;
  });

  // 👇 Efecto táctil
  let startX = 0;
  let endX = 0;

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", () => {
    const deltaX = endX - startX;

    if (deltaX > 50) {
      // Swipe derecha (previo)
      if (currentIndex > 0) {
        moveToSlide(currentIndex - 1);
      }
    } else if (deltaX < -50) {
      // Swipe izquierda (siguiente)
      if (currentIndex < allSlides.length - 1) {
        moveToSlide(currentIndex + 1);
      }
    }

    // Reset
    startX = 0;
    endX = 0;
  });
});
