var capitalize = (string) => {
  return string.toUpperCase() + string.slice(1);
};

var adminDelete = ({ person }) => {
  return `
    <button>Delete ${capitalize(person)}</button>
  `;
};

var personRecord = ({ person, deleteButton }) => {
  return `
    <li>
      <span>${capitalize(person)}</span>
      ${deleteButton}
    </li>
  `;
};

var peopleList = ({ people, isAdmin }) => {
  return `
    <ul>
      ${people.map(person => personRecord({ person, deleteButton: isAdmin ? adminDelete({ person }) : '' })).join('')}
    </ul>
  `;
};

var page = ({ people, isAdmin }) => {
  return `
    <h2>People</h2>
    ${peopleList({ people, isAdmin })}
  `;
};


document.body.insertAdjacentHTML('beforeend', page({
  people:['Jon','Amy','Christian'],
  isAdmin:false
}));