const images = [
    './assets/img/banner/banner1.png',
    './assets/img/banner/banner2.jpg',
    './assets/img/banner/banner3.jpg',
    './assets/img/banner/banner4.jpg',
    './assets/img/banner/banner5.jpg',
    './assets/img/banner/banner6.jpg',
    './assets/img/banner/banner7.jpg',
    './assets/img/banner/banner8.jpg',
    './assets/img/banner/banner9.jpg'
];

const carouselContainer = document.querySelector('.shashi');
let currentIndex = 0;

// Create slides
images.forEach((img, index) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');
    slide.style.backgroundImage = `linear-gradient(rgba(4,9,30,0.4), rgba(4,9,30,0.4)), url(${img})`;


    if (index === 0) {
        slide.classList.add('active'); // Set the first image active
    }

    carouselContainer.appendChild(slide);
});

// Change slide every 5 seconds
function changeSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
}

setInterval(changeSlide, 5000); // Carousel auto changes every 5 seconds

// Manual slide movement (next/prev buttons)
function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
}



// form data
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const formData = new FormData(e.target);
        const response = await fetch('/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Store success message in sessionStorage
            sessionStorage.setItem('registrationSuccess', 'true');
            
            // Redirect to the URL provided by backend
            window.location.href = data.redirectUrl;
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred during registration');
    }
});


function DiffCountry(){
    let imgBx = document.querySelectorAll(".imgBx");
let contectBx = document.querySelectorAll(".contentBx");

for (let i = 0; i < imgBx.length; i++) {
    imgBx[i].addEventListener("mouseover", function () {
        for (let j = 0; j < contectBx.length; j++) {
            contectBx[j].className = 'contentBx';
        }
        document.getElementById(this.dataset.id).className = 'contentBx active';

       
        for (let j = 0; j < imgBx.length; j++) {
            imgBx[j].className = 'imgBx';
        }
        this.className = 'imgBx active';
    });

}

}
DiffCountry();