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
    const elements = document.querySelectorAll('.ReviewsSection');

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


document.addEventListener('DOMContentLoaded', () => {
    const cards = Array.from(document.querySelectorAll('.review-carousel'));
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let index = 0;

    const showCard = (newIndex) => {
        const current = cards[index];
        const next = cards[newIndex];

        // Fade out current card
        current.classList.remove('active');
        current.classList.add('previous');

        // Fade in next card
        next.classList.add('active');

        // After transition, remove previous class
        setTimeout(() => {
            current.classList.remove('previous');
        }, 500); // matches CSS transition duration

        index = newIndex;
    }

    nextBtn.addEventListener('click', () => {
        const newIndex = (index + 1) % cards.length;
        showCard(newIndex);
    });

    prevBtn.addEventListener('click', () => {
        const newIndex = (index - 1 + cards.length) % cards.length;
        showCard(newIndex);
    });

    // Show first card on load
    cards[index].classList.add('active');
});