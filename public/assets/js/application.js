document.getElementById('application-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = document.getElementById('apply-btn');
    submitButton.disabled = true;
    
    try {
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData);
        
        console.log('Sending application data:', formDataObj);
        
        const response = await fetch('/api/v1/application/submit', {
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
            e.target.reset();
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