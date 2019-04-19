// GLOBAL VARIABLES ---------------------
var slideImages;
var currentSliderImgIndex = 0;

function loadJSON(callback) {
  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'assets/health-care.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {

      // .open will NOT return a value but simply returns undefined in async mode so use a callback
      callback(xobj.responseText);
    }
  }
  xobj.send(null);
}

window.addEventListener('load', function () {
  loadJSON(function (response) {
    let jsonImages = JSON.parse(response);
    createSliderTemplate(jsonImages);
    slideImages = document.getElementsByClassName("show-slide");
    startSlider();
  });
})

function onClickOpenNav() {
  let nav = document.getElementById("nav");
  nav.classList.toggle("nav-links-active");
}

function createSliderTemplate(imagesData) {
  let sliderContent = '';
  sliderContent += createSingleSliderTemplate(imagesData[0], 'concat us');
  sliderContent += createSingleSliderTemplate(imagesData[1], 'read more');
  sliderContent += createSingleSliderTemplate(imagesData[2], 'read more');

  document.getElementById('slider').innerHTML += sliderContent;
}

function createSingleSliderTemplate(imageData, buttonText) {
  return ` <div class="show-slide fade">
      <img src=${imageData.imagePath} width="1640px" height="802px">
      <div class="pic-text-warper">
          <h1 class="main-h log-in-heading">${imageData.imageHeadline}</h1>
          <p class="slider-text"><small>${imageData.imageDescription}</small></p>
          <button class="btn button-blue btn-slider">${buttonText}</button>
      </div>
  </div>
  `;
}

function hideSliderImage(imageIndex) {
  slideImages[imageIndex].style.display = "none";
}

function showSliderImage(imageIndex) {
  slideImages[imageIndex].style.display = "block";
}

// init slider
function startSlider() {
  showSliderImage(0);
}

function onClickNextSlide() {
  if (currentSliderImgIndex < slideImages.length - 1) {
    hideSliderImage(currentSliderImgIndex);
    currentSliderImgIndex++;
    showSliderImage(currentSliderImgIndex);
  }
}

function onClickPrevSlide() {
  if (currentSliderImgIndex > 0) {
    hideSliderImage(currentSliderImgIndex);
    currentSliderImgIndex--;
    showSliderImage(currentSliderImgIndex);
  }
}


