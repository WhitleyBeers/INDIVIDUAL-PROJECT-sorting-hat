console.log('Here we go!');

const students = [];
const houses = ['Gryffindor', 'Ravenclaw', 'Slytherin', 'Hufflepuff'];
const expelledStudents = [];

// RANDOMIZE
houses[Math.floor(Math.random() * houses.length)]

// QUERY SELECTORS
const studentCards = document.querySelector('#studentContainer')
const sortButton = document.querySelector('#sort-me');
const form = document.querySelector('#formContainer');
const expelledCards = document.querySelector('#expelledContainer')
const submitButton = document.querySelector('#submit')

// FUNCTIONS
const renderToDom = (divId, htmlToRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlToRender;
};

const cardsOnDom = (array) => {
  let domString = "";
  for (const member of array) {
    domString += `<div class="card" style="width: 18rem;">
    <img src="${member.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">${member.name}</p>
      <p class="card-text">${member.house}</p>
      <button class="btn btn-danger" id="delete--${member.id}">Expel</button>
    </div>
  </div>`;
  }
  renderToDom("#studentContainer", domString);
}

const createStudent = (e) => {
  e.preventDefault();
    const newStudent = {
      id: students.length + 1,
      name: document.querySelector('#studentName').value,
      house: houses[Math.floor(Math.random() * houses.length)]
    }
  students.push(newStudent);
  console.log(students);
  document.querySelector('#submitStudent').reset();
  renderToDom('#formContainer', "");
  cardsOnDom(students);
}

// EVENTS
sortButton.addEventListener('click', () => {
  let domString = `<form id="submitStudent"><div class="form-floating mb-3 col-sm-5">
  <input type="text" class="form-control" id="studentName" placeholder="student name">
  <label for="floatingInput">Please type your name here</label>
  </div>
  <button type="submit" class="btn btn-primary" id="submit">Submit</button></form>`;
  renderToDom('#formContainer', domString);
})

form.addEventListener('submit', createStudent);
