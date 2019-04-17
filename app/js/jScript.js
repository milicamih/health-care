 // GLOBAL VARIABLES ---------------------
 var slideImages;
 var current = 0;
 
 async function loadJSON (url) {
  try {
    var res = await fetch(url);
    return await res.json();
  } catch (error) {
    throw Error ("JSON path is not valid");
  }
}


window.addEventListener('load', function() {

  loadJSON('health-care.json').then(data => {
    createSliderTemplate(data);

    slideImages = document.getElementsByClassName("show-slide");
    
    startSlide();

  }, error => {
   
    alert('Something went wrong: ' + error);
  });
})
 
function showSpinner() {
  document.getElementById("spinner").style.display = "flex";
}

function hideSpinner() {
  document.getElementById("spinner").style.display = "none";
}

function onClickOpenNav() { 
  var nav = document.getElementById("nav");

  nav.classList.toggle("nav-links-active");  
}


 function createSliderTemplate(imagesData) {
  var sliderContent = '';
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

//clear all images
function reset() {
  for(let i=0; i<slideImages.length; i++){
    slideImages[i].style.display = "none";
  }
}  

//init slider
function startSlide() {
  reset();
  slideImages[0].style.display = "block";
}

function plusSlides() {
 if(current<slideImages.length-1){
    reset();
    slideImages[current+1].style.display = "block";
    current++; 
  }
  slideImages[current].style.display = "block";
}

function minusSlides() {
  if(current>0){
    reset();
    slideImages[current-1].style.display = "block";
    current--;
  }  
   slideImages[current].style.display = "block";
}


