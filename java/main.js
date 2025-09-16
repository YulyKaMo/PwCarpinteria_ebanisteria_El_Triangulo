document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".carousel-video");
  let currentIndex = 0;

  // Iniciar el primer video
  videos[currentIndex].play();

  videos.forEach((video, index) => {
    video.addEventListener("ended", () => {
      // Ocultar el video actual
      video.classList.remove("active");

      // Pasar al siguiente (cíclico)
      currentIndex = (index + 1) % videos.length;

      // Mostrar el siguiente
      const nextVideo = videos[currentIndex];
      nextVideo.classList.add("active");
      nextVideo.play();
    });
  });
});


  document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.getElementById("cardCarousel");
    if (!carousel) return;

    // Función para saltar al inicio del carrusel
    function scrollToCarouselStart() {
      const yOffset = 0;  // ajusta si tienes un navbar fijo: puede ser -50, por ejemplo.
      const y = carousel.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "instant" });
    }

    // 1) Escucha el evento 'slid.bs.carousel' de Bootstrap (cuando el slide ya cambió)
    carousel.addEventListener("slid.bs.carousel", function() {
      // Opcional: comprueba ancho de pantalla si quieres que solo en móviles
      if (window.innerWidth <= 768) {
        scrollToCarouselStart();
      }
    });

    // 2) Respaldo: en los botones prev/next, tras un retraso
    const botones = document.querySelectorAll("[data-bs-target='#cardCarousel'][data-bs-slide]");
    botones.forEach(function(boton) {
      boton.addEventListener("click", function() {
        if (window.innerWidth <= 768) {
          setTimeout(scrollToCarouselStart, 300);  // 300ms para dar tiempo al slide
        }
      });
    });
  });



/*MENU LATERAL*/

document.addEventListener('DOMContentLoaded', () => {
  const offcanvas = document.getElementById('menuLateral');
  const btnScrollTop = document.querySelector('.btn-scroll-top');

  if (!offcanvas || !btnScrollTop) return;

  offcanvas.addEventListener('show.bs.offcanvas', () => {
    if (window.innerWidth < 768) {
      btnScrollTop.style.display = 'none';
    }
  });

  offcanvas.addEventListener('hide.bs.offcanvas', () => {
    if (window.innerWidth < 768) {
      btnScrollTop.style.display = 'block';
    }
  });
});
  
/*ANIMACION SECCION SOBRE NOSOTROS, SERVICIOS, CATALOGO Y CONTACTO*/
document.addEventListener("DOMContentLoaded", function () {
      const observerOptions = {
      threshold: 0.2, // mejor en móvil para elementos más altos
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active"); //Esto permite repetir la animación
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .paso-animado, .fade-slide-up, .card-animada, .slide-up");
    animatedElements.forEach(el => observer.observe(el));
  });


/*GALERIA DE IMAGENES DENTRO DEL MODAL DEL CATALOGO*/
  
document.addEventListener("DOMContentLoaded", function () {
  function setupCarousel(modalId, mainImageId, counterId, prevBtnId, nextBtnId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.addEventListener("shown.bs.modal", function () {
      const thumbnails = modal.querySelectorAll(".thumbnail");
      const mainImage = document.getElementById(mainImageId);
      const imageCounter = document.getElementById(counterId);
      const prevBtn = document.getElementById(prevBtnId);
      const nextBtn = document.getElementById(nextBtnId);

      if (!mainImage || !imageCounter || !prevBtn || !nextBtn) return;

      let currentIndex = 0;
      const totalImages = thumbnails.length;

      function updateMainImage(index) {
        const selectedThumbnail = thumbnails[index];
        mainImage.src = selectedThumbnail.src;
        mainImage.alt = selectedThumbnail.alt;
        imageCounter.textContent = `${index + 1} / ${totalImages}`;

        thumbnails.forEach(thumb => thumb.classList.remove("active"));
        selectedThumbnail.classList.add("active");

        currentIndex = index;
      }

      thumbnails.forEach((thumb, index) => {
        thumb.addEventListener("click", () => updateMainImage(index));
      });

      nextBtn.addEventListener("click", () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= totalImages) newIndex = 0;
        updateMainImage(newIndex);
      });

      prevBtn.addEventListener("click", () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = totalImages - 1;
        updateMainImage(newIndex);
      });

      updateMainImage(0);
    });
  }

  // Llama a la función para cada modal con sus respectivos IDs
  setupCarousel("armariosModal", "armMainImage", "armImageCounter", "armprevBtn", "armnextBtn");
  setupCarousel("bibliotecaModal", "biblMainImage", "biblImageCounter", "biblprevBtn", "biblnextBtn");
  setupCarousel("cocinaModal", "cocMainImage", "cocImageCounter", "cocprevBtn", "cocnextBtn");
  setupCarousel("comedorModal", "comMainImage", "comImageCounter", "comprevBtn", "comnextBtn");
  setupCarousel("dormitorioModal", "dormMainImage", "dormImageCounter", "dormprevBtn", "dormnextBtn");
  setupCarousel("escalerasModal", "escMainImage", "escImageCounter", "escprevBtn", "escnextBtn");
  setupCarousel("banosModal", "banMainImage", "banImageCounter", "banprevBtn", "bannextBtn");
  setupCarousel("espejoModal", "espMainImage", "espImageCounter", "espprevBtn", "espnextBtn");
  setupCarousel("puertas_ventanasModal", "puertMainImage", "puertImageCounter", "puertprevBtn", "puertnextBtn");

});

//Scroll tactil

slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].pageX;
  scrollLeft = slider.scrollLeft;
  lastStep = 0;
});

slider.addEventListener('touchmove', (e) => {
  e.preventDefault();

  const deltaX = e.touches[0].pageX - startX;
  const stepsMoved = Math.floor(deltaX / stepSize);

  if (stepsMoved !== lastStep) {
    const stepDiff = stepsMoved - lastStep;
    slider.scrollLeft = scrollLeft - stepDiff * stepSize;
    lastStep = stepsMoved;
  }
});
