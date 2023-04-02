const menuHamburger = document.querySelector(".menu-hamburger")
const navLinks = document.querySelector(".nav-links")
let header = document.querySelector(".header");
let scroll = 0;

const target = document.getElementById("text-anim");
let array = [
  "amusant",
  "interactif",
  "divertissant",
  "passionnant",
  "stimulant",
  "captivant",
  "stylé",
  "fun",
];
let wordIndex = 0;
letterIndex = 0;

let footer = document.querySelector("footer");

window.addEventListener("scroll", () => {
  if (scroll < window.scrollY) {
    header.style.top = "-200px";
  } else {
    header.style.top = 0;
  }
  scroll = window.scrollY;
});

//------------------------------------

menuHamburger.addEventListener('click', () => {
  navLinks.classList.toggle('mobile-menu')
})

//--------------------------------------

// window.addEventListener("scroll", () => {
//   let scrollValue =
//     (window.scrollY + window.innerHeight) / document.body.offsetHeight;
//   console.log(scrollValue);
//   console.log(window.scrollY);
//   console.log(window.innerHeight);
//   console.log(document.body.offsetHeight);

//   if (scrollValue > 0.8) {
//     document.body.style.background = "red";
//   } else if (scrollValue > 0.6) {
//     document.body.style.background = "yellow";
//   } else if (scrollValue < 0.6) {
//     document.body.style.background = "blue";
//   }
// });

//-------------------------------------------

const createLetter = () => {
  const letter = document.createElement("span");

  target.appendChild(letter);

  letter.textContent = array[wordIndex][letterIndex];

  setTimeout(() => {
    letter.remove();
  }, 2800);
};

const loop = () => {
  setTimeout(() => {
    if (wordIndex >= array.length) {
      wordIndex = 0;
      letterIndex = 0;
      loop();
    } else if (letterIndex < array[wordIndex].length) {
      createLetter();
      letterIndex++;
      loop();
    } else {
      wordIndex++;
      letterIndex = 0;
      setTimeout(() => {
        loop();
      }, 2800);
    }
  }, 60);
};
loop();

//----------------------------------------------

const text = document.getElementById("text");
text.innerHTML = text.textContent.replace(/\S/g, '<span id="texte2">$&</span>');

const ele = document.querySelectorAll("#texte2");

for (var i = 1; i < ele.length; i++) {
  ele[i].style.transform = "rotate(" + i * 16.5 + "deg)";
}

const text2 = document.getElementById("text2");
text2.innerHTML = text2.textContent.replace(
  /\S/g,
  '<span id="texte2">$&</span>'
);

const ele2 = document.querySelectorAll("#texte2");

for (var i = 1; i < ele2.length; i++) {
  ele2[i].style.transform = "rotate(" + i * 16.5 + "deg)";
}

const text3 = document.getElementById("text3");
text3.innerHTML = text3.textContent.replace(
  /\S/g,
  '<span id="texte2">$&</span>'
);

const ele3 = document.querySelectorAll("#texte2");

for (var i = 1; i < ele3.length; i++) {
  ele3[i].style.transform = "rotate(" + i * 16.5 + "deg)";
}

//----------------------------------------
