import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    backgroundColor: "",
    action: {
      disabledBackground: "#002984",
      disabled: "#ffffff",
    },
  },
  color: {
    textColor: "rgba(0, 0, 0, 0.87)",
  },
});
export default theme;
