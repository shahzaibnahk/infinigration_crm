export const styles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: "transparent", // Remove border color
    backgroundColor: "#EFEFEF", // Set background color
    padding: "4px", // Adjust padding
    boxShadow: "none",
    fontSize: "14px", // Remove box shadow
    outline: state.isFocused ? "none" : baseStyles.outline, // Remove outline when focused
    "&:hover": {
      borderColor: "transparent", // Ensure no border color on hover
    },
  }),
};

export const bgWhiteStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: "transparent", // Remove border color
      backgroundColor: "#FFFFFF", // Set background color
      padding: "4px", // Adjust padding
      boxShadow: "none",
      fontSize: "14px", // Remove box shadow
      outline: state.isFocused ? "none" : baseStyles.outline, // Remove outline when focused
      "&:hover": {
        borderColor: "transparent", // Ensure no border color on hover
      },
    }),
  };
