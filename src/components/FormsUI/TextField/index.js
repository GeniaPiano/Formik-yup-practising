
import { TextField } from '@mui/material';
import { useField } from 'formik';

export const TextFieldWrapper = ({
                              name,
                              ...otherProps
                          }) => {
    const [field, mata] = useField(name);

    const configTextField = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined'
    };

    if (mata && mata.touched && mata.error) {
        configTextField.error = true;
        configTextField.helperText = mata.error;
    }

    return (
        <TextField {...configTextField} />
    );
};

