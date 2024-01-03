const link = document.location.href;
const url = new URL(link);
const queryParams = url.searchParams;
const taskID = queryParams.get('edit');

const wrapper = document.querySelector('.main-wrapper');

const backButton = document.querySelector('.details-back');
backButton.addEventListener('click', () => {
    window.location.href = "/index.html";
});

const detailsHTML = `
<div class="details-id details">Task ID: <span>${taskID}</span></div>
<div class="details-name details">Name: <span>NAME</span></div>
<div class="details-description details">Description: <span>DESC</span></div>
<div class="details-date details">Creation date: <span>DATE</span></div>
<div class="details-status details">Status: <span>STATUS</span></div>
`;

wrapper.insertAdjacentHTML('afterbegin', detailsHTML)