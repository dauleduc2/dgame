const styles = () => ({
  galobalLoadingWrapper: {
    width: "100%",
    height: "calc(100vh)",
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  loadingIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: 150,
  },
});

export default styles;
