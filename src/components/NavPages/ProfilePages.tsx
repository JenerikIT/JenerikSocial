const Profile = () => {
  return (
    <div className="main-container profile">
      <ProfileSidebar />
      <div className="profile__user">
        <UserProfile />
      </div>
      <ProfileContact />
    </div>
  );
};

export default Profile;
