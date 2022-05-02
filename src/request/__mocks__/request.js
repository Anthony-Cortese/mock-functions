const users = {
  3: { name: "Natalie", age: 40 },
  4: { name: "Mark", age: 23 },
  5: { name: "Paul", age: 25 },
};

export default function request(url) {
  return new Promise((resolve, reject) => {
    const userID = parseInt(url.substr("/users/".length), 10);
    process.nextTick(() =>
      users[userID]
        ? resolve(users[userID])
        : reject({
            error: "User with " + userID + " not found.",
          })
    );
  });
}
