const carrusel = document.getElementById('carrusel');
const indicators = document.getElementById('indicators');

let currentIndex = 0;
const items = document.querySelectorAll('.carrusel-item');
const totalItems = items.length;

for (let i = 0; i < totalItems; i++) {
    const dot = document.createElement('div')
    dot.classList.add('indicator')
    if (i === 0) dot.classList.add('active')
    dot.addEventListener('click', () => goToSlide(i))
    indicators.appendChild(dot)
};

function updateIndicators(){
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex)
    })
};

function goToSlide(index){
    currentIndex = index
    carrusel.style.transform = `translateX(-${currentIndex * 100}%)`
    updateIndicators()
}