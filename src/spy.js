function greeter(firstname, lastname) {
  return "Hello!" + getFullName(firstname, lastname);
}

function getFullName(firstname, lastname) {
  return firstname + " " + lastname;
}

module.exports = {
  greeter,
  getFullName,
};
