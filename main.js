console.log('Here we go!');

const students = [];
const houses = ['Gryffindor', 'Ravenclaw', 'Slytherin', 'Hufflepuff'];
const expelledStudents = [];

// QUERY SELECTORS
const studentCards = document.querySelector('#studentContainer')
const sortButton = document.querySelector('#sort-me');
const form = document.querySelector('#formContainer');
const expelledCards = document.querySelector('#expelledContainer')
const submitButton = document.querySelector('#submit')
const filterButtons = document.querySelector('#buttons');

// FUNCTIONS
const renderToDom = (divId, htmlToRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlToRender;
};

const cardsOnDom = (array) => {
  let domString = "";
  for (const member of array) {
    domString += `<div class="card text-center ${member.house}" style="width: 12rem;">
    <div class="card-body">
      <h5 class="card-title">${member.name}</h5>
      <p class="card-text">has been sorted into ${member.house}</p>
      <button class="btn btn-dark" id="delete--${member.id}">Expel</button>
    </div>
  </div>`;
  }
  renderToDom("#studentContainer", domString);
}

const voldysArmy = (array) => {
  let domString = "";
  for (const member of array) {
    domString += `<div class="card text-white bg-dark" style="width: 14rem;">
    <div class="card-body">
      <p class="card-text">${member.name} has joined the Death Eaters!</p>
    </div>
  </div>`;
  }
  renderToDom("#expelledContainer", domString);
}

const createStudent = (e) => {
  e.preventDefault();
    const newStudent = {
      id: students.length + 1,
      name: document.querySelector('#studentName').value,
      house: houses[Math.floor(Math.random() * houses.length)]
    }
  students.push(newStudent);
  students.sort((a, b) => a.house.localeCompare(b.house));
  console.log(students);
  document.querySelector('#submitStudent').reset();
  renderToDom('#formContainer', "");
  cardsOnDom(students);
}

function filter(array, typeString) {
  const studentArray = [];
  for (const student of array) {
    if (student.house === typeString) {
      studentArray.push(student);
    }
  }
  return studentArray;
}

// EVENTS
sortButton.addEventListener('click', () => {
  let domString = `<form id="submitStudent"><div class="form-floating mb-1 col-sm-5">
  <input type="text" class="form-control" id="studentName" placeholder="student name" required>
  <label for="floatingInput">Please type your name here</label>
  </div>
  <button type="submit" class="btn btn-primary" id="submit">Submit</button></form>`;
  renderToDom('#formContainer', domString);
})

form.addEventListener('submit', createStudent);

studentCards.addEventListener('click', (e) => {
  if (e.target.id.includes("delete")) {
    const [, id] = e.target.id.split("--");

    const index = students.findIndex(e => e.id === Number(id));
    const removed = students.splice(index, 1);
    expelledStudents.push(removed[0]);

    cardsOnDom(students);
    voldysArmy(expelledStudents);
  }
});

filterButtons.addEventListener('click', (e) => {
  if (e.target.id.includes("slytherin")) {
    const snakes = filter(students, 'Slytherin')
    cardsOnDom(snakes);
  } else if (e.target.id.includes("gryffindor")) {
    const griffins = filter(students, 'Gryffindor')
    cardsOnDom(griffins);
  } else if (e.target.id.includes("hufflepuff")) {
    const badgers = filter(students, 'Hufflepuff')
    cardsOnDom(badgers);
  } else if (e.target.id.includes("ravenclaw")) {
    const ravens = filter(students, 'Ravenclaw')
    cardsOnDom(ravens);
  } else if (e.target.id.includes("showAll")) {
    cardsOnDom(students);
  }
});

const startApp = () => {
  cardsOnDom(students);
  cardsOnDom(expelledStudents);
}

startApp();
