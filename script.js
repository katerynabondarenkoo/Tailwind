document.addEventListener('DOMContentLoaded', function() 
{
    const menuBtn = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.navigation');
    const body = document.body;

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
        
            menuBtn.classList.toggle('active');
            
            
            nav.classList.toggle('-right-full');
            nav.classList.toggle('right-0');

            
            if (nav.classList.contains('right-0')) {
                body.classList.add('overflow-hidden');
            } else {
                body.classList.remove('overflow-hidden');
            }
        });

       
        const navLinks = document.querySelectorAll('.navigation a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                nav.classList.add('-right-full');
                nav.classList.remove('right-0');
                body.classList.remove('overflow-hidden');
            });
        });
    }

   
    const doctorsToggle = document.getElementById('doctors-toggle');
    
    const dropdownMenu = doctorsToggle ? doctorsToggle.nextElementSibling : null;

    if (doctorsToggle && dropdownMenu) {
        doctorsToggle.addEventListener('click', function(event) {
            event.preventDefault();
            
            dropdownMenu.classList.toggle('hidden');
            dropdownMenu.classList.toggle('block'); 
        });

       
        window.addEventListener('click', function(event) {
            if (!doctorsToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.add('hidden');
                dropdownMenu.classList.remove('block');
            }
        });
    }

    
    function initializeSlider(containerSelector) {
        const sliderContainer = document.querySelector(containerSelector);
        if (!sliderContainer) return;

        const wrapper = sliderContainer.querySelector('.slider-wrapper');
        const track = sliderContainer.querySelector('.slider-track');
        const prevButton = sliderContainer.querySelector('.prev-arrow');
        const nextButton = sliderContainer.querySelector('.next-arrow');
        
        if (!track || !prevButton || !nextButton) return;

        const cards = Array.from(track.children);
        if (cards.length === 0) return;

        let currentIndex = 0;
        let cardWidth, cardGap, slideWidth, cardsToShow;

        function updateSliderParams() {
            cardWidth = cards[0].offsetWidth;
            
            cardGap = parseInt(window.getComputedStyle(track).gap) || 24;
            slideWidth = cardWidth + cardGap;
            
            const wrapperWidth = wrapper.offsetWidth;
            cardsToShow = Math.floor((wrapperWidth + cardGap) / slideWidth);
            if (cardsToShow <= 0) cardsToShow = 1;

           
            const maxIndex = Math.max(0, cards.length - cardsToShow);
            if (currentIndex > maxIndex) currentIndex = maxIndex;

            updateSliderPosition(false);
            updateArrows();
        }

        function updateSliderPosition(animate = true) {
            if (animate) {
                track.style.transition = 'transform 0.5s ease-in-out';
            } else {
                track.style.transition = 'none';
            }
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            updateArrows();
        }

        function updateArrows() {
            const maxIndex = Math.max(0, cards.length - cardsToShow);
            
            prevButton.classList.toggle('hidden', currentIndex === 0);
            nextButton.classList.toggle('hidden', currentIndex >= maxIndex);
        }

        nextButton.addEventListener('click', () => {
            const maxIndex = Math.max(0, cards.length - cardsToShow);
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSliderPosition();
            }
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });

        window.addEventListener('resize', updateSliderParams);
        
        window.addEventListener('load', () => setTimeout(updateSliderParams, 100));
        
        
        updateSliderParams();
    }

   
    initializeSlider('.doctors-section');      
    initializeSlider('.team-section');         
    initializeSlider('.testimonials-section'); 
});