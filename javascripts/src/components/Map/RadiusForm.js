import React from 'react';
import { Field, reduxForm } from 'redux-form';

const RadiusForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return <form onSubmit={handleSubmit}>
        <Field
            name="radius"
            component="input"
            type="number"
            placeholder="Rayon"
            parse={value => Number(value)}
        />
        <div>
            <button type="submit" disabled={pristine || submitting}>OK</button>
        </div>
    </form>;
};

export default reduxForm({
    form: 'radius', // a unique identifier for this form
})(RadiusForm);