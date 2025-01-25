window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
  
    preloader.style.display = 'none';
    mainContent.style.display = 'block';
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


