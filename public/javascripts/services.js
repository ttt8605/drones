const NavElements = document.getElementsByName('Services');

// Loop through each element and add the class
NavElements.forEach(element => {
element.classList.add('border-bottom', 'border-light-subtle');
});
document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("description");

  
});


//animation----
document.addEventListener("DOMContentLoaded", function() {
            const container = document.getElementById("description");

            function isElementInViewport(el) {
                const rect = el.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            }

            function onScroll() {
                if (isElementInViewport(container)) {
                    container.classList.add("swap");
                } else {
                    container.classList.remove("swap");
                }
            }

            document.addEventListener("scroll", onScroll);
            window.addEventListener("resize", onScroll);

            // Initial check in case the element is already in view
            onScroll();
        });



        document.addEventListener("DOMContentLoaded", function() {
            const elements = document.querySelectorAll('.img2');
    
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