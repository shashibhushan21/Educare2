document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('liveCounsellingForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = document.getElementById('submitBtn');
            submitButton.disabled = true;
            
            try {
                const formData = new FormData(form);
                const formDataObj = Object.fromEntries(formData);
                
                console.log('Sending form data:', formDataObj);
                
                const response = await fetch('/api/v1/live-counselling/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataObj)
                });
                
                const data = await response.json();
                console.log('Server response:', data);
                
                if (response.ok) {
                    alert('Application submitted successfully!');
                    form.reset();
                } else {
                    throw new Error(data.message || 'Failed to submit application');
                }
            } catch (error) {
                console.error('Submission error:', error);
                alert(`Failed to submit application: ${error.message}`);
            } finally {
                submitButton.disabled = false;
            }
        });
    }

    // Initialize datepicker
    $('.datepicker').calendar({
        type: 'date',
        formatter: {
            date: function(date) {
                if (!date) return '';
                return date.toISOString().split('T')[0];
            }
        }
    });
});