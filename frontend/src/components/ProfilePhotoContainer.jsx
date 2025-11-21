import formatProfilePhotoURL from "../utils/createProfilePhotoURL";
import defaultProfilePhoto from "../assets/images/defaultProfilePhotoPlaceholder.png";

function ProfilePhotoContainer({photoStyle,person}) {
  return (
    <>
      <div className="xl:w-12 xl:h-12 w-8 h-8 ">
        <img
          src={formatProfilePhotoURL(person)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultProfilePhoto;
          }}
          className={`${photoStyle} w-full h-full rounded-full object-cover`}
          alt="Profile"
        />
      </div>
    </>
  );
}

export default ProfilePhotoContainer;
