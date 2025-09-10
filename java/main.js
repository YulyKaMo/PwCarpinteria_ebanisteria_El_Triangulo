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

  /*DESAPARECER BOTON DE TOP INICIO EN EL MODAL*/
  document.addEventListener("DOMContentLoaded", function () {
  const scrollTopBtn = document.getElementById("btn-scroll-top");
  const modal = document.getElementById("comedorModal");

  if (modal && scrollTopBtn) {
    // Cuando el modal se abre, oculta el botón
    modal.addEventListener("shown.bs.modal", function () {
      scrollTopBtn.style.display = "none";
    });

    // Cuando el modal se cierra, vuelve a mostrar el botón
    modal.addEventListener("hidden.bs.modal", function () {
      scrollTopBtn.style.display = "block"; // o 'flex' si lo usas así
    });
  }
});

  /*GALERIA DE IMAGENES DENTRO DEL MODAL DEL CATALOGO*/
  document.addEventListener("DOMContentLoaded", function () {
    // Espera a que se abra el modal para cargar los elementos correctamente
    const modal = document.getElementById("comedorModal");

    modal.addEventListener("shown.bs.modal", function () {
      const thumbnails = modal.querySelectorAll(".thumbnail");
      const mainImage = document.getElementById("mainImage");
      const imageCounter = document.getElementById("imageCounter");
      const prevBtn = document.getElementById("prevBtn");
      const nextBtn = document.getElementById("nextBtn");

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

      // Click en miniaturas
      thumbnails.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
          updateMainImage(index);
        });
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

      // Mostrar la primera imagen al abrir el modal
      updateMainImage(0);
    });
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
