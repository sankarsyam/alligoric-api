module.exports = user => {
  const serialized = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    birthYear: user.birthYear,
    student: user.student,
    roles: ["admin"],
    imageURL: "/assets/images/users/syam.jpg",
  };
  return serialized;
};
