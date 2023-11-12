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
    input.className = 'Politica_Noastra'; 
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


const form = document.querySelector('#form-add-post')

form.addEventListener('submit', async (e) => {
    
    const type = document.querySelector('input[name="Type"]:checked').value
    const title = document.querySelector('.Title').value
    const pricePerRoom = document.querySelector('.Price').value
    const priceWholePlace = document.querySelector('.Price-whole-place').value
    const image = document.querySelector('.Image').value
    const phoneNumber = document.querySelector('.Phone-Number').value
    const email = document.querySelector('.Email').value
    const startDate = document.querySelector('.StartDate').value
    const endDate = document.querySelector('.EndDate').value
    const checkInHour = document.querySelector('.check-in-hour').value
    const checkOutHour = document.querySelector('.check-out-hour').value
    const Description = document.querySelector('#Descriere').value

    const aboutProperty = Array.from(document.querySelectorAll('.Despre_Proprietate')).map(input => input.value);
    const facilities = Array.from(document.querySelectorAll('.Facilitati')).map(input => input.value);
    const extraServices = Array.from(document.querySelectorAll('.Servicii_Extra')).map(input => input.value);
    const rules = Array.from(document.querySelectorAll('.Politica-Noastra')).map(input => input.value);

    try {
        e.preventDefault();

                //First backend function (add Post)
        const response = await fetch('http://localhost:3000/AddPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: type,
                title: title,
                pricePerRoom: pricePerRoom,
                priceWholePlace: priceWholePlace,
                image: image,
                phoneNumber: phoneNumber,
                email: email,
                startDate: startDate,
                endDate: endDate,
                checkInHour: checkInHour,
                checkOutHour: checkOutHour,
                Description: Description,

                aboutProperty: aboutProperty,
                facilities: facilities,
                extraServices: extraServices,
                rules: rules
            }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result);
            window.location.href = '/'
        } else {
            console.error('Add post error:', response.statusText);
        }


                //Second backend function (Increment number of posts)
        const Type = document.querySelector('input[name="Type"]:checked').value;

        const response2 = await fetch('http://localhost:3000/IncrementNumber', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Type: Type
            }),
        });

        

        if (response2.ok) {
            const result = await response2.text();
            
            
            console.log(result);
        } else {
            console.error('Increment error:', response2.statusText);
        }

    } catch (error) {
        console.error('Add post general error:', error);
    }
})
