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

