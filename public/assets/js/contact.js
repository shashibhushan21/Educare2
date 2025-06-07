document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const formData = new FormData(e.target);
        const response = await fetch('/api/v1/contact/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Message sent successfully!');
            e.target.reset();
        } else {
            alert(data.message || 'Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending the message');
    }
});