import ProfileContact from "../components/sections/ProfileContact/ProfileContact";
import UserProfile from "../components/sections/UserProfile/UserProfile";

const Profile = () => {
  return (
    <>
      <div className="profile__user">
        <UserProfile />
      </div>
      <ProfileContact />
    </>
  );
};

export default Profile;
