import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    marginBottom: 15,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default useStyles;
