const styles = (theme) => ({
  desktopCart: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  mobileCart: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
});

export default styles;
