document.addEventListener('DOMContentLoaded', function() {
    let universities = [];
    const courseContainer = document.querySelector('.course-area-wrapper .row.column-gap-50');
    const streamSelect = document.getElementById('streamSelect');
    const degreeSelect = document.getElementById('degreeSelect');
    const applyFilters = document.getElementById('applyFilters');

    // Load initial data
    fetchUniversities();

    async function fetchUniversities() {
        try {
            const response = await fetch('/data.json');
            universities = await response.json();
            displayUniversities(universities);
        } catch (error) {
            console.error('Error loading universities:', error);
            courseContainer.innerHTML = '<p>Error loading university data</p>';
        }
    }

    // Add filter button click handler
    applyFilters.addEventListener('click', function() {
        const selectedStream = streamSelect.value;
        const selectedDegree = degreeSelect.value;

        const filteredUniversities = universities.filter(uni => {
            const streamMatch = !selectedStream || uni.Stream === selectedStream;
            const degreeMatch = !selectedDegree || uni.degree === selectedDegree;
            return streamMatch && degreeMatch;
        });

        displayUniversities(filteredUniversities);
    });

    function displayUniversities(data) {
         courseContainer.innerHTML = ''; 

        if (!data || data.length === 0) {
            courseContainer.innerHTML = `
                <div class="col-12">
                    <div class="no-results" style="text-align: center; padding: 40px; background: #f8f9fa; border-radius: 8px;">
                        <h4>No Universities Found</h4>
                        <p>Please try different filter criteria</p>
                    </div>
                </div>`;
            return;
        }

        data.forEach(function(course) {
            const courseItem = `
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-4">
                    <div class="single-course-item">
                        <div class="thumbnail zoom-in">
                            <div class="background-image" style="background-image: url(${course.image});"></div>
                        </div>
                        <div class="contact">
                            <p class="tag" style="color: #121; font-weight: 700; font-size: 17px;">${course.university}</p>
                            <h5 class="title" style="font-size: 15px; color: #444; font-weight: 500;">
                                <table>
                                    <tr>
                                        <td>University Type</td>
                                        <td>: ${course.type}</td>
                                    </tr>
                                    <tr>
                                        <td>Tuition Fee</td>
                                        <td>: ${course.fees}</td>
                                    </tr>
                                    <tr>
                                        <td>Medium</td>
                                        <td>: ${course.medium}</td>
                                    </tr>
                                    <tr>
                                        <td>IELTS</td>
                                        <td>: ${course.IELTS}</td>
                                    </tr>
                                </table>
                            </h5>
                        </div>
                        <div class="hover-option" style="background: #f2d61c;">
                            <div class="contact">
                                <p class="tag" style="color: #121; font-weight: 700; font-size: 17px;">${course.university}</p>
                                <h3 class="title">${course.course}</h3>
                                <h5 class="title" style="font-size: 15px; color: #444; font-weight: 500;">
                                    <table>
                                        <tr>
                                            <td>Intake</td>
                                            <td style="white-space: nowrap;">: ${course.intake}</td>
                                        </tr>
                                        <tr>
                                            <td>Eligibility</td>
                                            <td>: ${course.eligibility}</td>
                                        </tr>
                                        <tr>
                                            <td>Duration</td>
                                            <td>: ${course.duration}</td>
                                        </tr>
                                    </table>
                                </h5>
                                <p class="paragraph">Approved : ${course.approved}</p>
                                <div class="video-play-wrapper">
                                    <a class="video-play-btn mfp-iframe" style="height: 40px; width: 40px; text-align: center;" href="${course.video}">
                                        <svg width="14" height="20" viewBox="0 0 14 25" style="margin-bottom: 40px; margin-right: 5px;" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.124 12.6362L0.364909 24.7606L0.36491 0.511875L13.124 12.6362Z" fill="white"></path>
                                        </svg>
                                    </a>
                                    <p class="text" style="font-size: 13px; color: #121; margin-right: 8px;">Watch Intro</p>
                                    <a href="/university/${course.id}" style="color: #111; font-weight: 600; font-size: 14px; transition: color 0.3s ease;" onmouseover="this.style.color='#045D5D';" onmouseout="this.style.color='#111';">See More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            courseContainer.insertAdjacentHTML('beforeend', courseItem);
        });

        // Reinitialize Magnific Popup
        $('.mfp-iframe').magnificPopup({
            type: 'iframe'
        });
    }
});