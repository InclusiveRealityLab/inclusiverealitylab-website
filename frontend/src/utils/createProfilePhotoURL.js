const createProfilePhotoURL = (person) => {
  let baseLink = `/images/profilePhotos/${person["given name"].toLowerCase()}`;

  let secondaryPart = ``;

  person["family name"]
    ? (secondaryPart = `_${person["family name"].toLowerCase()}.jpeg`)
    : (secondaryPart = `.jpeg`);

  return baseLink + secondaryPart;
};

export default createProfilePhotoURL;
