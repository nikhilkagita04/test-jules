document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Optional: defines vertical alignment
                });
            }
        });
    });

    // CTA Button Animation:
    // The subtask mentions that a CSS-based hover effect is likely sufficient
    // and would have been part of the CSS task.
    // For example, in style.css:
    // #hero button:hover {
    //   background-color: #ff9100; /* Lighter orange on hover */
    //   transform: translateY(-2px); /* Subtle lift */
    //   box-shadow: 0 4px 8px rgba(0,0,0,0.2); /* Slightly more pronounced shadow */
    // }
    // If more complex JS-driven animation is needed, it would be added here.
    // For now, relying on CSS for hover effects on CTAs.

    console.log("The Grind Diary script loaded and executed.");
});
