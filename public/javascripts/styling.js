
  document.getElementById('toggle-btn').addEventListener('click', function() {
    var section = document.getElementById('my-section');
    section.classList.toggle('active'); // Toggle the 'active' class on the section
    
    if (section.classList.contains('active')) {
      section.style.maxHeight = section.scrollHeight + 'px'; // Set max-height to the scrollHeight of the section
    } else {
      section.style.maxHeight = 0; // Reset max-height to 0 when hiding the section
    }
  });

  