const createProfilePhotoURL = (person) => {
  let baseLink = `/images/profilePhotos/${person["Given Name"].toLowerCase()}`;

  let secondaryPart = ``;

  person["Family Name"]
    ? (secondaryPart = `_${person["Family Name"].toLowerCase()}.jpg`)
    : (secondaryPart = `.jpg`);

  return baseLink + secondaryPart ;
};

export default createProfilePhotoURL;
