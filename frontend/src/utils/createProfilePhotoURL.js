const createProfilePhotoURL = (person) => {
  let baseLink = `/images/profilePhotos/${person["given name"].toLowerCase()}`;

  let secondaryPart = ``;

  person["family name"]
    ? (secondaryPart = `_${person["family name"].toLowerCase()}.jpg`)
    : (secondaryPart = `.jpg`);

  return baseLink + secondaryPart ;
};

export default createProfilePhotoURL;
