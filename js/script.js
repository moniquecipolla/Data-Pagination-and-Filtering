/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Declaring global variables that will be used throughout the code.
const itemsPerPage = 9
const header = document.querySelector('header');
const studentList = document.querySelector('.student-list');

/*
The showPage function displays the studentItem variable from the given list parameter.
This shows student information such as name, email, registered date, etc.
*/
function showPage(list, page) {
  const startIndex = ((page * itemsPerPage) - itemsPerPage);
  const endIndex = (page * itemsPerPage);
  studentList.textContent = '';
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      const studentItem = `<li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
        <h3>${list[i].name.first} ${list[i].name.last}</h3>
        <span class="email">${list[i].email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${list[i].registered.date}</span>
      </div>
    </li>
    `;
    studentList.insertAdjacentHTML('beforeend', studentItem);
    }
  }
}



/*
The addPagination function adds buttons to the bottom of the page to navigate through all students.
This function also sets the active class to the current page button selected.
Additionally, this function automatically scrolls to the top of the page when clicking through to a new page.
*/
function addPagination(list) {
  const numOfPages = Math.ceil(list.length / itemsPerPage);
  const linkList = document.querySelector('.link-list');
  linkList.innerHTML = '';
   for (let i = 1; i <= numOfPages; i++) {
    const buttonValue = `<li>
    <button type="button">${i}</button>
    </li>
    `;
  linkList.insertAdjacentHTML('beforeend', buttonValue); 
  linkList.querySelector('button').className = 'active';
  }
  linkList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      document.querySelector('.active').className = '';
      event.target.className = 'active';
      showPage(list, event.target.textContent);
      window.scrollTo(0,0);
    }
  });
}


// Call functions

showPage(data, 1);
addPagination(data);

// These lines add a search box with the class student search and insert it adjacent to the Header element.

let studentSearch = `<div id="student-search" class="student-search">
<input type="text" id="search" placeholder="Search by name...">
<button type="submit" class="submit"><img src="img/icn-search.svg" alt="search button"></button>
`;

header.insertAdjacentHTML('beforeend', studentSearch);

// This declares the value of searchInput and searchEvent to be used in the following functions and event listeners.

const searchInput = document.getElementById('search');
const searchEvent = document.getElementById('student-search');

/*
The searchStudents function creates an empty array for filtered (searched) results.
It loops through the student names and checks whether any names in the data array match with the value of the search input.
If a match is found, the student(s) are displayed and the page numbers are updated accordingly.
If no match is found, a "no results" message is displayed.
*/

function searchStudents(searchInput) {
  let filteredResults = [];
  for(let i = 0; i < data.length; i++){
      let fullName = `${data[i].name.first} ${data[i].name.last}`
      if(fullName.toLowerCase().includes(searchInput.toLowerCase())) {
        filteredResults.push(data[i]);
        showPage(filteredResults, 1)
        addPagination(filteredResults);
        }
      }
      if (filteredResults.length === 0) {
        studentList.innerHTML = `<li class="student-item cf">No matching results found.</li>`;
      }
   }

/*
The following code adds two event listeners to the page so as someone types in the search bar,
or hits enter/clicks the search submit button, the searchStudents function is called and results are displayed. 
*/


searchEvent.addEventListener('keyup', () => {
  searchStudents(searchInput.value);
});

searchEvent.addEventListener('submit', () => {
  searchStudents(searchInput.value);
});