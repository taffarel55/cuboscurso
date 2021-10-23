import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

const Buttons = ({variant}) => {
  return (
    <>
      <Button variant={variant} color="primary" startIcon={<DeleteIcon/>}>
        Primary
      </Button>
    </>
  );
};

export default Buttons;