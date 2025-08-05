const formatProfilePhotoURL = (googleDriveLink) => {
  const match = googleDriveLink.match(/id=([^&]+)\/?/);
  console.log(match);
  const photoId = match ? match[1] : null;

  return `https://drive.google.com/thumbnail?&id=${photoId}`;
};

export default formatProfilePhotoURL;
