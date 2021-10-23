import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: "auto",
    marginBottom: 20,
  },
  media: {
    height: "auto",
    width: "100px !important",
    margin: "0 auto",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default useStyles;
