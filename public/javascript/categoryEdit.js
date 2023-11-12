const form = document.querySelector('form');
const editButton = document.querySelector("#edit-button");

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    window.location.href = '/'
    const oldCategoryName = decodeURIComponent(window.location.pathname.split('/')[1]);

    try {
        const newCategoryName = document.querySelector('#newCategoryName').value; 

        const response = await fetch(`http://localhost:3000/${oldCategoryName}/edit`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newCategoryName: newCategoryName
            }),
        });

        if (response.ok) {
            const result = await response.text();
            
            console.log(result);
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
});
