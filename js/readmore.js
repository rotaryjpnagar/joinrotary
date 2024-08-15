document.addEventListener('DOMContentLoaded', function() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const fullDescription = this.previousElementSibling;

            if (fullDescription.classList.contains('hidden')) {
                fullDescription.classList.remove('hidden');
                this.textContent = "Read Less";
            } else {
                fullDescription.classList.add('hidden');
                this.textContent = "Read More";
            }
        });
    });
});
