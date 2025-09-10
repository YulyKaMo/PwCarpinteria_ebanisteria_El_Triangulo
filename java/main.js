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
    const thumbnails = document.querySelectorAll("#comedorModal .thumbnail");
    const mainImage = document.getElementById("mainImage");
    const imageCounter = document.getElementById("imageCounter");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const totalImages = thumbnails.length;
    let currentIndex = 0;

    // Función para actualizar la imagen principal
    function updateMainImage(index) {
      const selectedThumbnail = thumbnails[index];
      mainImage.src = selectedThumbnail.src;
      mainImage.alt = selectedThumbnail.alt;
      imageCounter.textContent = `${index + 1} / ${totalImages}`;

      // Remover clase activa y agregar a la actual
      thumbnails.forEach(thumb => thumb.classList.remove("active"));
      selectedThumbnail.classList.add("active");

      currentIndex = index;
    }

    // Clic en miniaturas
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener("click", () => {
        updateMainImage(index);
      });
    });

    // Botón "siguiente"
    nextBtn.addEventListener("click", () => {
      let newIndex = currentIndex + 1;
      if (newIndex >= totalImages) newIndex = 0;
      updateMainImage(newIndex);
    });

    // Botón "anterior"
    prevBtn.addEventListener("click", () => {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = totalImages - 1;
      updateMainImage(newIndex);
    });

    // Reiniciar al abrir el modal
    const modal = document.getElementById("comedorModal");
    modal.addEventListener("shown.bs.modal", () => {
      updateMainImage(0);
    });
  });