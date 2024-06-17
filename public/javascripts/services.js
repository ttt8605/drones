const NavElements = document.getElementsByName('Services');

// Loop through each element and add the class
NavElements.forEach(element => {
element.classList.add('border-bottom', 'border-light-subtle');
});
document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("description");

  
});
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