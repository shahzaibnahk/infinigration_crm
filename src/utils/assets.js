import bg from "../assets/images/bg.png";
import logo from "../assets/images/logo.png";
import male_placeholder from "../assets/images/male_placeholder.jpg";
import female_placeholder from "../assets/images/female_placeholder.jpg";

export const assets = { bg, logo, male_placeholder, female_placeholder };

export const generateProfilePicture = (isAuthenticated, user) => {
  if (
    isAuthenticated &&
    user?.avatar.url === "temp_url" &&
    user?.gender === "male"
  ) {
    return male_placeholder;
  }

  if (
    isAuthenticated &&
    user?.avatar.url === "temp_url" &&
    user?.gender === "female"
  ) {
    return female_placeholder;
  }
  
  else {
    return user?.avatar.url;
  }
};
