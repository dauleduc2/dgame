function showSlides() {
  let slideIndex;
  let slides = document.getElementsByClassName("slideSection");
  let dots = document.getElementsByClassName("dot");
  for (let i = 0; i < slides.length; i++) {
    const element = slides[i];
    element.style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    const element = dots[i];
    element.className = element.className.replace("active", "");
  }
  slides[slideIndex].style.display = "flex";
  dots[slideIndex].className += " active";
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 0;
  }
}
function currentSlide(n) {
  showSlides((slideIndex = n));
}
let loadCall = function () {
  showSlides((slideIndex = 0));
};
const loadMyScript = () => window.addEventListener("load", () => loadCall());
export default loadMyScript;
