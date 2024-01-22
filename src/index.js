const backBtn = document.querySelector(".previous-btn");
const forwardBtn = document.querySelector(".next-btn");
const images = document.querySelectorAll(".img");
const radioBtn = document.querySelectorAll("input[name=slideshow]");

let nextImg = 0;

const removeClass = (element) => {
  element.classList.remove("left", "right", "active");
};

const getNextImg = () => {
  if (nextImg === images.length - 1) {
    nextImg = 0;
  } else if (nextImg < 0) {
    nextImg = images.length - 1;
  }
  return nextImg;
};

const changeImg = (img, direction) => {
  let oldImgDirection;
  let newImgDirection;

  if (direction === "forward") {
    oldImgDirection = "left";
    newImgDirection = "right";
  } else if (direction === "backward") {
    oldImgDirection = "right";
    newImgDirection = "left";
  }

  const active = document.querySelector(".active");
  active.classList.add(oldImgDirection);
  images[img].classList.add(newImgDirection, "active", "no-transition");
  // OffsetWidth hack from CSS-Tricks to trigger animation
  // https://css-tricks.com/restart-css-animation/
  images[img].offsetWidth;
  images[img].classList.remove(newImgDirection, "no-transition");
  setTimeout(removeClass, 1000, active);
};

// Disable all buttons for 1s
const disableBtn = () => {
  radioBtn.forEach((btn) => {
    btn.disabled = true;
    setTimeout(() => {
      btn.disabled = false;
    }, 1000);
  });
  forwardBtn.disabled = true;
  backBtn.disabled = true;
  setTimeout(() => {
    forwardBtn.disabled = false;
    backBtn.disabled = false;
  }, 1000);
};

// Event listener for Back button
backBtn.addEventListener("click", () => {
  changeImg(getNextImg(nextImg--), "backward");
  disableBtn();
});

// Event listener for Forward button
forwardBtn.addEventListener("click", () => {
  changeImg(getNextImg(nextImg++), "forward");
  disableBtn();
});

// Event listener for Radio buttons
radioBtn.forEach((btn) => {
  btn.addEventListener("change", (e) => {
    nextImg = e.target.value;
    changeImg(nextImg, "forward");
    disableBtn();
  });
});
