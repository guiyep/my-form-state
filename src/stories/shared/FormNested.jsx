import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const FormNested = ({
  formState: {
    fields: { profileOne, profileTwo },
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
            id={profileOne.name.path}
            label="Name"
            value={profileOne.name.value}
            margin="normal"
            onChange={onFieldChangeHandler}
            disabled={isSubmitted}
          />
          <TextField
            error={profileOne.familyName.showError}
            required
            id={profileOne.familyName.path}
            label="Family Name"
            value={profileOne.familyName.value}
            margin="normal"
            onChange={onFieldChangeHandler}
            disabled={isSubmitted}
          />
          <TextField
            error={profileOne.alias.showError}
            required
            id={profileOne.alias.path}
            label="Alias"
            value={profileOne.alias.value}
            margin="normal"
            onChange={onFieldChangeHandler}
            disabled={isSubmitted}
          />
          <TextField
            error={profileOne.favoriteColor.showError}
            required
            id={profileOne.favoriteColor.path}
            label="Favorite Color"
            value={profileOne.favoriteColor.value}
            margin="normal"
            onChange={onFieldChangeHandler}
            disabled={isSubmitted}
          />
        </div>
      </div>
      <br />
      {profileTwo && (
        <div>
          <div>
            <TextField
              error={profileTwo.name.showError}
              required
              id={profileTwo.name.path}
              label="Name"
              value={profileTwo.name.value}
              margin="normal"
              onChange={onFieldChangeHandler}
              disabled={isSubmitted}
            />
            <TextField
              error={profileTwo.familyName.showError}
              required
              id={profileTwo.familyName.path}
              label="Family Name"
              value={profileTwo.familyName.value}
              margin="normal"
              onChange={onFieldChangeHandler}
              disabled={isSubmitted}
            />
            <TextField
              error={profileTwo.alias.showError}
              required
              id={profileTwo.alias.path}
              label="Alias"
              value={profileTwo.alias.value}
              margin="normal"
              onChange={onFieldChangeHandler}
              disabled={isSubmitted}
            />
            <TextField
              error={profileTwo.favoriteColor.showError}
              required
              id={profileTwo.favoriteColor.path}
              label="Favorite Color"
              value={profileTwo.favoriteColor.value}
              margin="normal"
              onChange={onFieldChangeHandler}
              disabled={isSubmitted}
            />
          </div>
        </div>
      )}
      <br />

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
