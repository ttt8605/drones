const NavElements = document.getElementsByName('Home');
  
  // Loop through each element and add the class
  NavElements.forEach(element => {
    element.classList.add('border-bottom', 'border-light-subtle');
  });

// document.addEventListener("DOMContentLoaded", function() {
//     const elements = document.querySelectorAll('.img2');

//     const observer = new IntersectionObserver((entries,observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add('in-view');
//                 observer.unobserve(entry.target); // Stop observing once the animation has started
//             }
//         });
//     });

//     elements.forEach(element => observer.observe(element));
// });
document.addEventListener("DOMContentLoaded", function() {
    const batchContainers = document.querySelectorAll('.twoImgRow');

    batchContainers.forEach(container => {
        const elements = container.querySelectorAll('.img2');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // Stop observing this element
                }
            });
        }, {
            threshold: 0.1 // Adjust the threshold as needed
        });

        elements.forEach(element => observer.observe(element));
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.img1');

    const observer = new IntersectionObserver((entries,observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Stop observing once the animation has started
            }
        });
    });

    elements.forEach(element => observer.observe(element));
});


document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.letsWork');

    const observer = new IntersectionObserver((entries,observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Stop observing once the animation has started
            }
        });
    });

    elements.forEach(element => observer.observe(element));
});
document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.descriptionSection');

    const observer = new IntersectionObserver((entries,observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Stop observing once the animation has started
            }
        });
    });

    elements.forEach(element => observer.observe(element));
});



document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.projectIntro');

    const observer = new IntersectionObserver((entries,observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Stop observing once the animation has started
            }
        });
    });

    elements.forEach(element => observer.observe(element));
});

document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.profile');

    const observer = new IntersectionObserver((entries,observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Stop observing once the animation has started
            }
        });
    });

    elements.forEach(element => observer.observe(element));
});


document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.profileText');

    const observer = new IntersectionObserver((entries,observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Stop observing once the animation has started
            }
        });
    });

    elements.forEach(element => observer.observe(element));
});