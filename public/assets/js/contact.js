document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Disable submit button to prevent double submission
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    
    try {
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData);
        
        // Log the data being sent
        console.log('Sending form data:', formDataObj);
        
        const response = await fetch('/api/v1/contact/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObj)
        });
        
        const data = await response.json();
        console.log('Server response:', data);
        
        if (response.ok) {
            alert('Message sent successfully!');
            e.target.reset();
        } else {
            throw new Error(data.message || 'Server returned an error');
        }
    } catch (error) {
        console.error('Submission error details:', error);
        alert(`Failed to send message: ${error.message}`);
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
    }
});