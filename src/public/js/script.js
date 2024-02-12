// Definir variables globales
let slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let slideInterval;

// Función para iniciar la presentación de diapositivas
function startSlideshow() {
  slideInterval = setInterval(nextSlide, 5000); // Cambiar la imagen cada 5 segundos
}

// Función para avanzar a la siguiente diapositiva
function nextSlide() {
  if (slides.length === 0) return;

  slides[currentSlide].style.opacity = '0';
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].style.opacity = '1';
}

// Función para detener la presentación de diapositivas
function stopSlideshow() {
  clearInterval(slideInterval);
}

// Función para actualizar el contador regresivo
function actualizarContador() {
  const contadorElemento = document.getElementById('contador');

  if (!contadorElemento) return;

  const fechaObjetivo = new Date('February 11, 2024 12:00:00');
  const ahora = new Date().getTime();
  const diferencia = fechaObjetivo - ahora;

  if (diferencia > 0) {
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    contadorElemento.innerHTML = `
        <p>Este apartado del sitio web se habilitará en ${formatoCero(horas)}:${formatoCero(minutos)}:${formatoCero(segundos)}.</p>
    `;
  } else {
    contadorElemento.innerText = 'Disfrútalo.';
  }

  setTimeout(actualizarContador, 1000);
}

function formatoCero(numero) {
  return numero < 10 ? `0${numero}` : numero;
}

// Función para abrir el diálogo modal
function openDialog() {
  const dialog = document.getElementById('modeDialog');
  if (dialog) {
    dialog.style.display = 'block';
  }
}

// Función para cerrar el diálogo modal
function closeDialog() {
  const dialog = document.getElementById('modeDialog');
  if (dialog) {
    dialog.style.display = 'none';
  }
}

// Función para establecer el modo de la página
function setMode(mode) {
  document.body.className = mode;
  closeDialog();
}

// Función para cargar y mostrar comentarios
function fetchComments() {
  fetch('https://api-vanced.replit.app/comments/jamie')
    .then(response => response.json())
    .then(data => {
      const commentsContainer = document.getElementById('comments-container');
      if (data && data.comments && Array.isArray(data.comments)) {
        commentsContainer.innerHTML = '';
        data.comments.forEach(comment => {
          const commentDiv = document.createElement('div');
          commentDiv.classList.add('comment');
          commentDiv.innerHTML = `<strong>${comment.name}</strong>: ${comment.comment}`;
          commentsContainer.appendChild(commentDiv);
        });
      } else {
        console.error('Los comentarios no se pudieron obtener o no están en el formato esperado:', data);
      }
    })
    .catch(error => {
      console.error('Error al obtener comentarios:', error);
    });
}

const secciones = document.querySelectorAll(".seccion");
    const botonesContinuar = document.querySelectorAll(".continuar");

    botonesContinuar.forEach((boton, index) => {
        boton.addEventListener("click", function() {
        if (index < secciones.length - 1) {
            secciones[index].classList.remove("visible");
            secciones[index + 1].classList.add("visible");
            boton.parentElement.querySelector(".continuar").setAttribute("disabled", "disabled");
            boton.parentElement.nextElementSibling.querySelector(".continuar").removeAttribute("disabled");
        }
        });
    });

// Función para abrir el diálogo de cumpleaños
// Función para abrir el diálogo de cumpleaños
function openBirthdayDialog() {
  const birthdayDialog = document.getElementById('birthday-dialog');
  const overlay = document.getElementById('over');
  if (birthdayDialog && overlay) {
    birthdayDialog.style.display = 'block';
    overlay.style.display = 'block'; // Asegúrate de mostrar el overlay también
  }
}

// Función para cerrar el diálogo de cumpleaños
function closeBirthdayDialog() {
  const birthdayDialog = document.getElementById('birthday-dialog');
  const overlay = document.getElementById('over');
  if (birthdayDialog && overlay) {
    birthdayDialog.style.display = 'none';
    overlay.style.display = 'none'; // Asegúrate de ocultar el overlay también
  }
}

// Iniciar la presentación de diapositivas, el contador y cargar comentarios al cargar la página
window.onload = function() {
  startSlideshow();
  actualizarContador();
  fetchComments();
};
