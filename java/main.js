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


  document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("cardCarousel");
    if (!carousel) return;

    const topOffset = -10; // Ajusta si hay navbar fija, etc.

    // Detectar si es móvil
    function isMobile() {
      return window.innerWidth <= 768;
    }

    // Hacer scroll suave al carrusel
    function scrollToCarouselStart() {
      const y = carousel.getBoundingClientRect().top + window.scrollY + topOffset;
      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    }

    // 1. Al terminar la transición del carrusel
    carousel.addEventListener("slid.bs.carousel", function () {
      if (isMobile()) {
        scrollToCarouselStart();
      }
    });

    // 2. Prevención adicional si el evento no se dispara
    const controls = document.querySelectorAll("[data-bs-target='#cardCarousel'][data-bs-slide]");
    controls.forEach(control => {
      control.addEventListener("click", () => {
        if (isMobile()) {
          setTimeout(scrollToCarouselStart, 500); // le da tiempo a la transición
        }
      });
    });

    // 3. Corrige comportamiento cuando se redimensiona
    window.addEventListener("resize", () => {
      if (!isMobile()) {
        // Nada que hacer en desktop
        return;
      }
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
      const thumbnailContainer = modal.querySelector(".thumbnail-bar");

      if (!mainImage || !imageCounter || !prevBtn || !nextBtn) return;

      let currentIndex = 0;
      const totalImages = thumbnails.length;

      function updateMainImage(index) {
      if (index < 0 || index >= totalImages) return;

      const selectedThumbnail = thumbnails[index];
      if (!selectedThumbnail) return;

      mainImage.src = selectedThumbnail.src;
      mainImage.alt = selectedThumbnail.alt;
      imageCounter.textContent = `${index + 1} / ${totalImages}`;

      thumbnails.forEach(thumb => thumb.classList.remove("active"));
      selectedThumbnail.classList.add("active");

      // Centra el thumbnail visible
      scrollThumbnailIntoView(selectedThumbnail, thumbnailContainer);

      currentIndex = index;
      }

      function scrollThumbnailIntoView(thumbnail, container) {
        try {
          // Opción más compatible con móviles
          const containerRect = container.getBoundingClientRect();
          const thumbRect = thumbnail.getBoundingClientRect();
          const offset = thumbRect.left - containerRect.left - (container.clientWidth / 2) + (thumbRect.width / 2);

          container.scrollBy({ left: offset, behavior: 'smooth' });
        } catch (error) {
          // Fallback a scrollIntoView si falla el cálculo
          thumbnail.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }


      // Navegación por thumbnails
      thumbnails.forEach((thumb, index) => {
        thumb.addEventListener("click", () => updateMainImage(index));
      });
       
      // Botón siguiente
      nextBtn.addEventListener("click", () => { 
        let newIndex = currentIndex + 1;
        if (newIndex >= totalImages) newIndex = 0;
        updateMainImage(newIndex);
      });

      // Botón anterior
      prevBtn.addEventListener("click", () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = totalImages - 1;
        updateMainImage(newIndex);
      });

      // Inicializa con la primera imagen
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

 // ✅ Soporte para scroll táctil horizontal en thumbnails (opcional)
  const sliders = document.querySelectorAll(".thumbnail-container");

  sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("touchstart", (e) => {
      isDown = true;
      startX = e.touches[0].pageX;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("touchmove", (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX;
      const walk = (startX - x); // cuánto se mueve el dedo
      slider.scrollLeft = scrollLeft + walk;
    });

    slider.addEventListener("touchend", () => {
      isDown = false;
    });
  });

