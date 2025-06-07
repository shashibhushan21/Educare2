document.querySelector('.new-form-fix').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    
    try {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            mobile: document.getElementById('mobile').value,
            country: document.getElementById('country').value,
            state: document.getElementById('state').value,
            city: document.getElementById('city').value
        };
        
        console.log('Sending form data:', formData);
        
        const response = await fetch('/api/v1/about/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        console.log('Server response:', data);
        
        if (response.ok) {
            alert('Form submitted successfully!');
            e.target.reset();
        } else {
            throw new Error(data.message || 'Failed to submit form');
        }
    } catch (error) {
        console.error('Submission error:', error);
        alert(`Failed to submit form: ${error.message}`);
    } finally {
        submitButton.disabled = false;
    }
});