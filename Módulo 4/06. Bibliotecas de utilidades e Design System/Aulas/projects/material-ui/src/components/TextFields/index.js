import TextField from "@material-ui/core/TextField";

const TextFields = () => {
  return (
    <>
      <TextField id="standard-basic" label="Standard" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </>
  );
};

export default TextFields;
