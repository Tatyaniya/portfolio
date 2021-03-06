
if(document.getElementById('parallax')) {
    const parallaxContainer = document.getElementById('parallax');
    const layers = parallaxContainer.children;

    const moveLayers = function (e) {
        const initialX = (window.innerWidth / 2) - e.pageX;
        const initialY = (window.innerHeight / 2) - e.pageY;

        let i = 0;
        for (let layer of layers) {
            const divider = i/40;
            const positionX = initialX * divider;
            const positionY = initialY * divider;
            const bottomPosition = (window.innerHeight / 2) * divider;
            const image = layer.firstElementChild;

            layer.style.transform = `translate(${positionX}px, ${positionY}px)`;
            image.style.bottom = `-${bottomPosition}px`;
            i++;
        }
    };

    window.addEventListener('mousemove', moveLayers);
} 

else if (document.getElementById('map')) {
 

function initMap() {
    var element = document.getElementById('map');
    var options = {
        zoom: 5,
        center: {lat: 50.4501, lng: 30.5234}
    };

    var myMap = new google.maps.Map(element, options);
}

} else if (document.querySelector('.form__container')) {

    var blur = (function() {
        var wrapper = document.querySelector('.form__container'),
            form = document.querySelector('.blur');

        return {
            set: function () {
                var imgWidth = document.querySelector('.speaking').offsetWidth,
                    posLeft = -wrapper.offsetLeft,
                    posTop = -wrapper.offsetTop,
                    blurCSS = form.style;

                blurCSS.backgroundSize = imgWidth + 'px' + ' ' + 'auto';
                blurCSS.backgroundPosition = posTop + 'px' + ' ' + posLeft + 'px';
            }
        }
    })();

    blur.set();

    window.onresize = function () {
        blur.set();
}

}


    const slides = document.querySelectorAll('#slides .slide');
    const next = document.getElementById('next');
    const previous = document.getElementById('previous');
    const controls = document.querySelectorAll('.controls');
    
    let currentSlide = 0;
    
    function goToSlide(n){
        slides[currentSlide].className = 'slide';
        currentSlide = (n+slides.length)%slides.length;
        slides[currentSlide].className = 'slide showing';
    }
    
    function setupListners(){
        next.onclick = function(){
            goToSlide(currentSlide+1);
        }
        previous.onclick = function(){
            goToSlide(currentSlide-1);
        }
    }
    
    function sliderInit(){
        if (slides.length !== 0){
            setupListners();
        }
    }

    sliderInit()
