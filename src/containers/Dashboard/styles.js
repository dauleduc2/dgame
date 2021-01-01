const styles = (theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    overflow: "hidden",
  },
  contentWraper: {
    width: "100%",
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  turnRight: {
    marginRight: -240,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.sta,
    }),
  },
});
export default styles;
