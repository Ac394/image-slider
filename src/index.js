const backBtn = document.querySelector(".previous-btn");
const forwardBtn = document.querySelector(".next-btn");
const images = document.querySelectorAll(".img");
let current = 0;
console.log(images);

const removeClass = (element) => {
  element.classList.remove("left", "right", "active");
};

const getCurrent = () => {
  if (current === images.length - 1) {
    current = 0;
  } else {
    current += 1;
  }
};

backBtn.addEventListener("click", () => {
  if (document.querySelectorAll(".active").length === 1) {
    const active = document.querySelector(".active");
    active.classList.add("right");
    getCurrent();
    images[current].classList.add("left", "active", "no-transition");
    // OffsetWidth hack from CSS-Tricks to trigger animation
    images[current].offsetWidth;
    images[current].classList.remove("left", "no-transition");
    setTimeout(removeClass, 1000, active);
  }
});

forwardBtn.addEventListener("click", () => {
  if (document.querySelectorAll(".active").length === 1) {
    const active = document.querySelector(".active");
    active.classList.add("left");
    getCurrent();
    images[current].classList.add("right", "active", "no-transition");
    // OffsetWidth hack from CSS-Tricks to trigger animation
    images[current].offsetWidth;
    images[current].classList.remove("right", "no-transition");
    setTimeout(removeClass, 1000, active);
  }
});
