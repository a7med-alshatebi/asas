document.addEventListener('DOMContentLoaded', () => {
    const proxyUrl = 'https://a7med-alshatebi.tech/instagram-proxy';
    const loading = document.getElementById('loading');
    const slider = document.getElementById('slider');

    // Configure Swiper
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });

    // Fetch Instagram data
    fetch(proxyUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            loading.style.display = 'none';
            slider.classList.remove('hidden');
            populateSlider(swiper, data.data);
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            loading.innerHTML = `<p class="text-red-500">Error loading Instagram feed</p>`;
        });

    function populateSlider(swiperInstance, mediaItems) {
        mediaItems.forEach(media => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            
            const mediaContent = media.media_type === 'VIDEO' ?
                `<video controls class="w-full h-80 object-cover rounded-lg shadow-lg">
                    <source src="${media.media_url}" type="video/mp4">
                </video>` :
                `<img src="${media.media_url}" 
                      alt="${media.caption || 'Instagram post'}" 
                      class="w-full h-80 object-cover rounded-lg shadow-lg"
                      loading="lazy">`;

            slide.innerHTML = `
                <div class="relative group">
                    ${mediaContent}
                    <a href="${media.permalink}" target="_blank" rel="noopener noreferrer"
                       class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50">
                        <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                        </svg>
                    </a>
                    <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <p class="text-white truncate">${media.caption || ''}</p>
                    </div>
                </div>
            `;
            
            swiperInstance.appendSlide(slide);
        });
    }
});
