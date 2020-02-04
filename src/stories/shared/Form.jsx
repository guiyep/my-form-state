import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Form = ({
  formState: {
    fields: { alias, name, familyName, favoriteColor },
    isSubmittable,
    isSubmitted,
    isInitialized,
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
      <div>
        <Button disabled={!isSubmittable || isSubmitted} onClick={onSubmit}>
          Submit
        </Button>
        <Button disabled={!isInitialized} onClick={onClear}>
          Reset To Empty
        </Button>
        <Button disabled={!isInitialized} onClick={onReset}>
          Reset to default
        </Button>
      </div>
    </form>
  );
};

export default Form;
