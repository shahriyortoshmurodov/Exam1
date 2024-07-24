// JavaScript functionality can be added here as per your requirements
// For example, handling the rating and liking functionality
const ratings = document.querySelectorAll('.rating');

ratings.forEach(rating => {
    const stars = rating.querySelectorAll('[data-star]');
    const likeBtn = rating.querySelector('.like-btn');

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const starValue = star.getAttribute('data-star');
            highlightStars(stars, starValue);
        });

        star.addEventListener('mouseout', () => {
            resetStars(stars);
        });

        star.addEventListener('click', () => {
            const starValue = star.getAttribute('data-star');
            rating.setAttribute('data-rating', starValue);
            highlightStars(stars, starValue);
        });
    });

    likeBtn.addEventListener('click', () => {
        likeBtn.classList.toggle('liked');
    });
});

function highlightStars(stars, starValue) {
    stars.forEach(star => {
        if (star.getAttribute('data-star') <= starValue) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function resetStars(stars) {
    const rating = parseInt(stars[0].closest('.rating').getAttribute('data-rating'));
    highlightStars(stars, rating);
}
