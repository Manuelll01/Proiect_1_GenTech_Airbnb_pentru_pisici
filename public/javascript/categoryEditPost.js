const adaugalinieDespreProprietate = document.querySelector('#adauga-linie-Despre-Proprietate');
const containerDespreProprietate = document.querySelector('#Container_Despre_Proprietate');

adaugalinieDespreProprietate.addEventListener('click', (e) => {
    e.preventDefault();

    // Create a new div element to contain the input and delete button
    const divContainer = document.createElement('div');
    divContainer.className = 'Container-Div-Nou'

    // Create a new input field
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'Despre_Proprietate'; 
    input.name = 'aboutProperty[]';
    input.required = true;
    input.autocomplete = 'off';

    // Create delete button
    const deleteButton = document.createElement('a');
    deleteButton.innerText = 'Delete';
    deleteButton.href = '';
    deleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Remove the div container when the "Delete" button is clicked
        containerDespreProprietate.removeChild(divContainer);
    });

    // Append the input and the delete button to the div container
    divContainer.appendChild(input);
    divContainer.appendChild(deleteButton);

    const existingAnchor = document.querySelector('#adauga-linie-Despre-Proprietate');

    // Insert the new div container before the existing anchor
    containerDespreProprietate.insertBefore(divContainer, existingAnchor);
});


const adaugaLinieFacilitati = document.querySelector('#adauga-linie-Facilitati')
const containerFacilitati = document.querySelector('#Container_Facilitati')

adaugaLinieFacilitati.addEventListener('click', (e) => {

    e.preventDefault();

    // Create a new div element to contain the input and delete button
    const divContainer = document.createElement('div');
    divContainer.className = 'Container-Div-Nou'

    // Create a new input field
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'Facilitati'; 
    input.name = 'facilities[]';
    input.required = true;
    input.autocomplete = 'off';

    // Create delete button
    const deleteButton = document.createElement('a');
    deleteButton.innerText = 'Delete';
    deleteButton.href = '';
    deleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Remove the div container when the "Delete" button is clicked
        containerFacilitati.removeChild(divContainer);
    });

    // Append the input and the delete button to the div container
    divContainer.appendChild(input);
    divContainer.appendChild(deleteButton);

    const existingAnchor = document.querySelector('#adauga-linie-Facilitati');

    // Insert the new div container before the existing anchor
    containerFacilitati.insertBefore(divContainer, existingAnchor);

})

const adaugaLinieServicii = document.querySelector('#adauga-linie-Servicii-Extra')
const containerServiciiExtra = document.querySelector('#Container_Servicii_Extra')

adaugaLinieServicii.addEventListener('click', (e) => {

    e.preventDefault();

    // Create a new div element to contain the input and delete button
    const divContainer = document.createElement('div');
    divContainer.className = 'Container-Div-Nou'

    // Create a new input field
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'Servicii_Extra'; 
    input.name = 'extraServices[]';
    input.required = true;
    input.autocomplete = 'off';

    // Create delete button
    const deleteButton = document.createElement('a');
    deleteButton.innerText = 'Delete';
    deleteButton.href = '';
    deleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Remove the div container when the "Delete" button is clicked
        containerServiciiExtra.removeChild(divContainer);
    });

    // Append the input and the delete button to the div container
    divContainer.appendChild(input);
    divContainer.appendChild(deleteButton);

    const existingAnchor = document.querySelector('#adauga-linie-Servicii-Extra');

    // Insert the new div container before the existing anchor
    containerServiciiExtra.insertBefore(divContainer, existingAnchor);

})

const adaugaLiniePoliticaNoastra = document.querySelector('#adauga-linie-Politica-Noastra')
const containerPoliticaNoastra = document.querySelector('#Container_Politica_Noastra')

adaugaLiniePoliticaNoastra.addEventListener('click', (e) => {

    e.preventDefault();

    // Create a new div element to contain the input and delete button
    const divContainer = document.createElement('div');
    divContainer.className = 'Container-Div-Nou'

    // Create a new input field
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'Politica-Noastra'; 
    input.name = 'rules[]';
    input.required = true;
    input.autocomplete = 'off';

    // Create delete button
    const deleteButton = document.createElement('a');
    deleteButton.innerText = 'Delete';
    deleteButton.href = '';
    deleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Remove the div container when the "Delete" button is clicked
        containerPoliticaNoastra.removeChild(divContainer);
    });

    // Append the input and the delete button to the div container
    divContainer.appendChild(input);
    divContainer.appendChild(deleteButton);

    const existingAnchor = document.querySelector('#adauga-linie-Politica-Noastra');

    // Insert the new div container before the existing anchor
    containerPoliticaNoastra.insertBefore(divContainer, existingAnchor);

})  

// const formEditPost = document.querySelector('#form-edit-post')
// formEditPost.addEventListener('submit', async (e) => {
//     e.preventDefault()
//     try {
//         const title = document.querySelector('.Title').value
//         const pricePerRoom = document.querySelector('.Price').value
//         const priceWholePlace = document.querySelector('.Price-whole-place').value

//         const imageInput = document.querySelector('.Image');
//         const image = imageInput.files.length > 0 ? imageInput.files[0] : null;
//         // const image = imageInput.files[0]
        
//         const phoneNumber = document.querySelector('.Phone-Number').value
//         const email = document.querySelector('.Email').value
//         const startDate = document.querySelector('.StartDate').value
//         const endDate = document.querySelector('.EndDate').value
//         const checkInHour = document.querySelector('.check-in-hour').value
//         const checkOutHour = document.querySelector('.check-out-hour').value
//         const Description = document.querySelector('#Descriere').value

//         const aboutProperty = Array.from(document.querySelectorAll('.Despre_Proprietate')).map(input => input.value);
//         const facilities = Array.from(document.querySelectorAll('.Facilitati')).map(input => input.value);
//         const extraServices = Array.from(document.querySelectorAll('.Servicii_Extra')).map(input => input.value);
//         const rules = Array.from(document.querySelectorAll('.Politica-Noastra')).map(input => input.value);
        
//         const response = await fetch(`http://localhost:3000${window.location.pathname}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 title: title,
//                 pricePerRoom: pricePerRoom,
//                 priceWholePlace: priceWholePlace,
//                 image: image,
//                 phoneNumber: phoneNumber,
//                 email: email,
//                 startDate: startDate,
//                 endDate: endDate,
//                 checkInHour: checkInHour,
//                 checkOutHour: checkOutHour,
//                 Description: Description,

//                 aboutProperty: aboutProperty,
//                 facilities: facilities,
//                 extraServices: extraServices,
//                 rules: rules
//             }),
//         });

//         if (response.ok) {
//             const result = await response.json();

//             const currentPath = window.location.pathname;
//             const pathArray = currentPath.split("/");
//             pathArray.pop();
//             const modifiedPath = pathArray.join("/");
//             window.location.href = modifiedPath
//         } else {
//             console.error('Error:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Fetch error:', error);
//     }
// })




const formEditPost = document.querySelector('#form-edit-post');
formEditPost.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('title', document.querySelector('.Title').value);
        formData.append('pricePerRoom', document.querySelector('.Price').value);
        formData.append('priceWholePlace', document.querySelector('.Price-whole-place').value);

        const imageInput = document.querySelector('.Image');
        if (imageInput.files.length > 0) {
            formData.append('image', imageInput.files[0]);
        }

        formData.append('phoneNumber', document.querySelector('.Phone-Number').value);
        formData.append('email', document.querySelector('.Email').value);
        formData.append('startDate', document.querySelector('.StartDate').value);
        formData.append('endDate', document.querySelector('.EndDate').value);
        formData.append('checkInHour', document.querySelector('.check-in-hour').value);
        formData.append('checkOutHour', document.querySelector('.check-out-hour').value);
        formData.append('Description', document.querySelector('#Descriere').value);

        const aboutProperty = Array.from(document.querySelectorAll('.Despre_Proprietate')).map(input => input.value);
        const facilities = Array.from(document.querySelectorAll('.Facilitati')).map(input => input.value);
        const extraServices = Array.from(document.querySelectorAll('.Servicii_Extra')).map(input => input.value);
        const rules = Array.from(document.querySelectorAll('.Politica-Noastra')).map(input => input.value);

        formData.append('aboutProperty', JSON.stringify(aboutProperty));
        formData.append('facilities', JSON.stringify(facilities));
        formData.append('extraServices', JSON.stringify(extraServices));
        formData.append('rules', JSON.stringify(rules));

        const response = await fetch(`http://localhost:3000${window.location.pathname}`, {
            method: 'PATCH',
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();

            const currentPath = window.location.pathname;
            const pathArray = currentPath.split("/");
            pathArray.pop();
            const modifiedPath = pathArray.join("/");
            window.location.href = modifiedPath;
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
});


