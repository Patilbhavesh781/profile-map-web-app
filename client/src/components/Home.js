import React from "react";
import ProfileList from "./ProfileList";

function Home({ profiles, user, onDelete }) {
  return (
    <ProfileList
      profiles={profiles}
      user={user}
      onDelete={onDelete}
    />
  );
}

export default Home;
