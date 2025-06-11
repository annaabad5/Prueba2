function activarComparador(comparadorId, imagenId, divisorId) {
  const comparador = document.getElementById(comparadorId);
  const imagen = document.getElementById(imagenId);
  const divisor = document.getElementById(divisorId);

  comparador.addEventListener('mousemove', (e) => {
    const rect = comparador.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const porcentaje = (x / rect.width) * 100;

    imagen.style.clipPath = `inset(0 ${100 - porcentaje}% 0 0)`;
    divisor.style.left = `${porcentaje}%`;
  });

  // Inicial
  const inicial = comparador.getBoundingClientRect().width / 2;
  imagen.style.clipPath = `inset(0 50% 0 0)`;
  divisor.style.left = `50%`;
}

// Activar todos los comparadores
window.addEventListener("load", () => {
  activarComparador("comparador-paris", "imagen-paris", "divisor-paris");
  activarComparador("comparador-la", "imagen-la", "divisor-la");
  activarComparador("comparador-granvia", "imagen-granvia", "divisor-granvia");
  activarComparador("comparador-ny", "imagen-ny", "divisor-ny");
  activarComparador("comparador-coliseo", "imagen-coliseo", "divisor-coliseo");
});
