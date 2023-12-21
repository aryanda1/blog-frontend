import { styled } from "@mui/material/styles";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  fontSize: "clamp(2rem, 4vw, 3rem)",
  color: "blueviolet",
}));

function Fallback({ message }) {
  return (
    <Div
      sx={{
        display: "grid",
        placeItems: "center",
        height: "calc(100svh - 80px)",
        color: "ButtonText",
      }}
    >
      {message}
    </Div>
  );
}
export default Fallback;
