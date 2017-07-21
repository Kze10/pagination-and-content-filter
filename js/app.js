'use strict';

const page = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const studentsPerPage = 10;
let studentItems, pageNumbers, activate, divPage, ulPage, divMessage, pMessage;

studentItems = document.querySelectorAll('.student-item');

showPage(1, studentItems);
appendPageLinks(studentItems);
searchMarkUp();
// =====================================================================
// to create the mark up for the search function
function searchMarkUp() {
    const div = document.createElement('div');
    const input = document.createElement('input');
    const button = document.createElement('button');

    div.setAttribute('class', 'student-search');
    input.setAttribute('id', 'input');
    input.setAttribute('placeholder', 'Search for students...');
    button.setAttribute('id', 'buttonSearch');
    button.textContent = 'Search';

    pageHeader.appendChild(div);
    div.appendChild(input);
    div.appendChild(button);
}
// =====================================================================
function showPage(currentPage, currentList) {
    // hide all students on the page
    hideAllStudents();
    // split student list according to the pages
    let startList = (currentPage - 1) * studentsPerPage;
    let endList = (currentPage * studentsPerPage) - 1;
    // loop through all students in the current list
    for (let i = startList; i <= endList; i++) {
        let showStudents = currentList[i];
        if (showStudents) {
            showStudents.style.display = 'block';
        }
    }
}
// =====================================================================
function appendPageLinks(currentList) {
    // the ammount of pages the list will need
    pageNumbers = Math.ceil(currentList.length / studentsPerPage);
    // create div and ul
    divPage = document.createElement('div');
    ulPage = document.createElement('ul');
    divPage.setAttribute('class', 'pagination');
    ulPage.setAttribute('class', 'pagination__ul');
    page.appendChild(divPage);
    divPage.appendChild(ulPage);

    // create 'li' and 'a' mark up
    for (let i = 1; i <= pageNumbers; i++) {
        const pageList = document.createElement('li');
        const pageLink = document.createElement('a');
        pageLink.setAttribute('href', '#');
        pageLink.textContent = i;

        // select the 1st 10 students
        if (i === 1) {
            pageLink.setAttribute('class', 'active');
            activate = pageLink;
            showPage(1, currentList);
        }
        // activate page links and connect to the student list.
        pageLink.addEventListener('click', function(e) {
            showPage(i, currentList);
            activate.removeAttribute('class', 'active');
            e.target.setAttribute('class', 'active');
            activate = e.target;
        });
        // append content to the page.
        pageList.appendChild(pageLink);
        ulPage.appendChild(pageList);
    }
}
// =====================================================================
// Search Event Listenter
document.getElementById('buttonSearch').addEventListener('click', searchList, false);

// Search function
function searchList() {
    let match, search, searchValue, paginationDiv, li, name, email, notFound;
    // select the div of the pagination
    paginationDiv = document.querySelector('.pagination');
    // array to select the search result
    match = [];
    // Obtain the value of the search input
    search = document.getElementById('input');
    searchValue = search.value;

    // remove the previous page link section and students.
    hideAllStudents();
    if (divPage) {
        page.removeChild(divPage);
        divPage = null;
    }
    if (divMessage) {
        page.removeChild(divMessage);
        divMessage = null;
    }

    // Loop over the student list.
    for (let i = 0; i < studentItems.length; i++) {
        li = studentItems[i];
        // access the student’s name and email.
        name = li.getElementsByTagName('h3')[0].textContent;
        email = li.getElementsByClassName('email')[0].textContent;
        // if the search value is includes either email or name characters
        if (name.toLowerCase().includes(searchValue.toLowerCase()) || email.toLowerCase().includes(searchValue.toLowerCase())) {  
            match.push(li);
        }
    }

    // printing conditions
    if (match.length === 0) {
        notFound = 'Sorry, your search has found 0 results.'
        displayNotFound(notFound);
    } else if (match.length > 10) {
        appendPageLinks(match);
    } else {
        showPage(1, match);
    }
    // clear input field
    $('#input').val('');
}
// =====================================================================
// function to display the message of no results.
function displayNotFound(message) {
    divMessage = document.createElement('div');
    pMessage = document.createElement('p');
    pMessage.textContent = message;
    page.appendChild(divMessage);
    divMessage.appendChild(pMessage);
}
// =====================================================================
function hideAllStudents() {
    for (let i = 0; i < studentItems.length; i++) {
        studentItems[i].style.display = 'none';
    }
}