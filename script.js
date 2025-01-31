window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
  
    preloader.style.display = 'none';
    mainContent.style.display = 'block';
  });


  const cursor = document.getElementById('cursor');
const trail = document.getElementById('trail');

// Update cursor and trail positions on mousemove
document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  // Update cursor position
  cursor.style.transform = `translate(${x}px, ${y}px)`;

  // Update trail position
  trail.style.transform = `translate(${x}px, ${y}px)`;
});

// Ensure the cursor hides when not moving
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  trail.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  trail.style.opacity = '1';
});



        // skill section
        // Create an intersection observer to observe the skills section
// Create an intersection observer to trigger animation when the skill bar is in view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      // Select the span inside the bar that represents the progress
      const progressBar = entry.target.querySelector('span');

      // Set specific width based on the class of the bar
      if (entry.isIntersecting) {
          // Add the 'visible' class to start animation
          progressBar.classList.add('visible');

          // Set specific widths based on the class
          if (progressBar.classList.contains('Html')) {
              progressBar.style.width = '80%';
          } else if (progressBar.classList.contains('Css')) {
              progressBar.style.width = '70%';
          } else if (progressBar.classList.contains('javascript')) {
              progressBar.style.width = '43%';
          } else if (progressBar.classList.contains('cpp')) {
              progressBar.style.width = '75%';
          } else if (progressBar.classList.contains('linux')) {
              progressBar.style.width = '92%';
          }
      } else {
          // Reset width to 0% when out of view
          progressBar.classList.remove('visible');
          progressBar.style.width = '0%';
      }
  });
}, { threshold: 0.5 }); // Trigger when 50% of the .bar container is visible

// Select all the .bar elements (outer containers) to observe
const bars = document.querySelectorAll('.bar');

// Observe each .bar container
bars.forEach(bar => {
  observer.observe(bar);
});


const contactSection = document.querySelector('.contact');

window.addEventListener('scroll', () => {
  const sectionTop = contactSection.getBoundingClientRect().top;
  const sectionHeight = contactSection.offsetHeight;
  const windowHeight = window.innerHeight;

  if (sectionTop <= windowHeight && sectionTop + sectionHeight > 0) {
    contactSection.classList.add('in-view');
  } else {
    contactSection.classList.remove('in-view');
  }
});





const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');

// Toggle the navbar when the menu icon is clicked
menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Close the navbar when any link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});



document.addEventListener('DOMContentLoaded', function () {
  // Create an IntersectionObserver to observe the home and education sections
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          // If the section is in the viewport
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          } else {
              entry.target.classList.remove('visible'); // Remove class when out of view
          }
      });
  }, { threshold: 0.5 }); // Trigger when 50% of the section is in view

  // Select home and education sections
  const homeSection = document.querySelector('.home');
  const educationSection = document.querySelector('.education');

  // Observe the sections
  observer.observe(homeSection);
  observer.observe(educationSection);
});

(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="ZYSyWgUFDQEiJemJHE2S6";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();

document.getElementById('faq-link').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default link behavior

  // Check if Chatbase is initialized
  if (window.chatbase && typeof window.chatbase === 'function') {
      // Trigger the chat window to open
      window.chatbase('open');
  }
});
















