import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const FormNested = ({
  formState: {
    fields: {
      profileOne,
    },
    isSubmittable,
    isPristine,
    isSubmitted,
  },
  onFieldChange,
  onClear,
  onSubmit,
  onReset,
}) => {
  const onFieldChangeHandler = useCallback((e) => onFieldChange(e.target.id, e.target.value), [onFieldChange]);

  return (
    <form noValidate autoComplete="off">
      <div>
        <div>
          <TextField
            error={profileOne.name.showError}
            required
            id="name"
            label="Name"
            value={profileOne.name.value}
            margin="normal"
            onChange={onFieldChangeHandler}
            disabled={isSubmitted}
          />
          <TextField
            error={profileOne.familyName.showError}
            required
            id="familyName"
            label="Family Name"
            value={profileOne.familyName.value}
            margin="normal"
            onChange={onFieldChangeHandler}
            disabled={isSubmitted}
          />
          <TextField
            error={profileOne.alias.showError}
            required
            id="alias"
            label="Alias"
            value={profileOne.alias.value}
            margin="normal"
            onChange={onFieldChangeHandler}
            disabled={isSubmitted}
          />
          <TextField
            error={profileOne.favoriteColor.showError}
            required
            id="favoriteColor"
            label="Favorite Color"
            value={profileOne.favoriteColor.value}
            margin="normal"
            onChange={onFieldChangeHandler}
            disabled={isSubmitted}
          />
        </div>
      </div>
      <br></br>
      {/* <div>
        <div>
          <TextField
            error={name.showError}
            required
            id="name"
            label="Name"
            value={name.value}
            margin="normal"
            onChange={onFieldChangeHandler}
            disabled={isSubmitted}
          />
          <TextField
            error={familyName.showError}
            required
            id="familyName"
            label="Family Name"
            value={familyName.value}
            margin="normal"
            onChange={onFieldChangeHandler}
            disabled={isSubmitted}
          />
          <TextField
            error={alias.showError}
            required
            id="alias"
            label="Alias"
            value={alias.value}
            margin="normal"
            onChange={onFieldChangeHandler}
            disabled={isSubmitted}
          />
          <TextField
            error={favoriteColor.showError}
            required
            id="favoriteColor"
            label="Favorite Color"
            value={favoriteColor.value}
            margin="normal"
            onChange={onFieldChangeHandler}
            disabled={isSubmitted}
          />
        </div>
      </div> */}
      <br></br>

      <div>
        <Button disabled={!isSubmittable || isSubmitted} onClick={onSubmit}>
          Submit
        </Button>
        <Button disabled={isPristine} onClick={onClear}>
          Clear
        </Button>
        <Button disabled={isPristine} onClick={onReset}>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default FormNested;
