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

  const images = [
    { src: "media/imagenes/galeria/gallery_comedores_madera/comedor1.jpg", description: "Baños - Carpintería Joyla" },
    { src: "media/imagenes/galeria/gallery_comedores_madera/comedor2.jpg", description: "Baños - Carpintería Joyla" },
    { src: "media/imagenes/galeria/gallery_comedores_madera/comedor3.jpg", description: "Baños - Carpintería Joyla" },
    { src: "media/imagenes/galeria/gallery_comedores_madera/comedor4.jpg", description: "Baños - Carpintería Joyla" },
    { src: "media/imagenes/galeria/gallery_comedores_madera/comedor5.jpg", description: "Baños - Carpintería Joyla" },
    { src: "media/imagenes/galeria/gallery_comedores_madera/sillas1.jpg", description: "Baños - Carpintería Joyla" },
  ];

  let currentIndex = 0;

  const mainImage = document.getElementById("mainImage");
  const imageCounter = document.getElementById("imageCounter");
  const imageDescription = document.getElementById("imageDescription");
  const thumbnails = document.querySelectorAll(".thumbnail");

  function updateGallery(index) {
    currentIndex = index;
    mainImage.src = images[index].src;
    imageCounter.textContent = `${index + 1} / ${images.length}`;
    imageDescription.textContent = images[index].description;

    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle("border-primary", i === index);
      thumb.classList.toggle("opacity-50", i !== index);
    });
  }

  document.getElementById("prevBtn").addEventListener("click", () => {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = images.length - 1;
    updateGallery(newIndex);
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    let newIndex = currentIndex + 1;
    if (newIndex >= images.length) newIndex = 0;
    updateGallery(newIndex);
  });

  thumbnails.forEach(thumb => {
    thumb.addEventListener("click", () => {
      updateGallery(parseInt(thumb.dataset.index));
    });
  });

  // Inicializar galería al abrir el modal
  const comedorModal = document.getElementById('comedorModal');
  comedorModal.addEventListener('show.bs.modal', () => {
    updateGallery(0);
  });