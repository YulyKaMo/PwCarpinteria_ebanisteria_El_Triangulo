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
  setupCarousel("comedorModal", "mainImage", "imageCounter", "prevBtn", "nextBtn");
  setupCarousel("dormitorioModal", "dormMainImage", "dormImageCounter", "dormprevBtn", "dormnextBtn");
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
