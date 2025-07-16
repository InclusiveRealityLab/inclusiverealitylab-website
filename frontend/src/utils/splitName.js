const splitName = (name) => {
  let splitIndex = 0;
  for (let i = name.length; i > 0; i--) {
    if (name[i] == " ") {
      splitIndex = i;
      break;
    }
  }

  return [
    name.slice(0, splitIndex),
    name.slice(splitIndex, name.length),
  ];
};

function isUpperCase(char) {
  return /[A-Z]/.test(char);
}



export default splitName;
