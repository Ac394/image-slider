const backBtn = document.querySelector(".previous-btn");
const forwardBtn = document.querySelector(".next-btn");
const images = document.querySelectorAll(".img");
const radioBtn = document.querySelectorAll("input[name=slideshow]");

let currImg = 0;
let autoPlay;

const removeClass = (element) => {
  element.classList.remove("left", "right", "active");
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

const updateRadioBtn = (nextImg) => {
  console.log(nextImg);
  console.log(radioBtn[nextImg]);
  radioBtn[nextImg].checked = true;
};

const getNextImg = (nextImg) => {
  if (nextImg === images.length) {
    return 0;
  }
  if (nextImg < 0) {
    return images.length - 1;
  }
  return nextImg;
};

const changeImg = (nextImg, direction) => {
  let oldImgDirection;
  let newImgDirection;
  currImg = nextImg;
  disableBtn();
  startTimer();

  updateRadioBtn(nextImg);

  if (direction === "forward") {
    oldImgDirection = "left";
    newImgDirection = "right";
  } else if (direction === "backward") {
    oldImgDirection = "right";
    newImgDirection = "left";
  }

  const active = document.querySelector(".active");
  active.classList.add(oldImgDirection);
  images[nextImg].classList.add(newImgDirection, "active", "no-transition");
  // OffsetWidth hack from CSS-Tricks to trigger animation
  // https://css-tricks.com/restart-css-animation/
  images[nextImg].offsetWidth;
  images[nextImg].classList.remove(newImgDirection, "no-transition");
  setTimeout(removeClass, 1000, active);
};

const findDirection = (nextImg) => {
  if (nextImg > currImg) return "forward";
  if (nextImg < currImg) return "backward";
};

// Event listener for Back button
backBtn.addEventListener("click", () => {
  changeImg(getNextImg(currImg - 1), "backward");
});

// Event listener for Forward button
forwardBtn.addEventListener("click", () => {
  changeImg(getNextImg(currImg + 1), "forward");
});

// Event listener for Radio buttons
radioBtn.forEach((btn) => {
  btn.addEventListener("change", (e) => {
    const nextImg = Number(e.target.value);
    changeImg(nextImg, findDirection(nextImg));
  });
});

const startTimer = () => {
  clearInterval(autoPlay);
  autoPlay = setInterval(() => {
    changeImg(getNextImg(currImg + 1), "forward");
  }, 5000);
};

startTimer();
