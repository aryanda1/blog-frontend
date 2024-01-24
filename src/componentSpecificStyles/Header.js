import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({
  toolBar: {
    flexWrap: "wrap",
    position: "relative",
  },
  HeaderTabsContainer: {
    width: "100%",
    "@media (min-width: 678px)": {
      display: "flex",
      flex: 1,
      width: "auto",
      alignItems: "center",
    },
  },
  navTabsContainer: {
    display: "flex",
    marginLeft: "auto",
  },
  authActions: {
    display: "flex",
    marginLeft: "auto",
  },
  "@media (max-width: 678px)": {
    navTabsContainer: {
      justifyContent: "center",
    },
    authActions: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    HeaderTabsContainer: {
      opacity: 1,
      position: "absolute",
      transition: "top 700ms ease-in-out, opacity 700ms ease-in-out",
      paddingBlock: "8px",
      top: "110%",
      background:
        "linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)",
      left: 0,
      "&.hidden": {
        opacity: 0,
        top: "-500px",
      },
    },
  },
});
