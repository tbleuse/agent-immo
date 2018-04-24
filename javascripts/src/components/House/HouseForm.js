import React from 'react';
import { Field, reduxForm } from 'redux-form';


import './HouseForm.less';


/*
  comment: Option[String],
  toSellSince: Option[Date],
  createadAt: Option[Date],
  updatedAt: Option[Date]*/

const HouseForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Address</label>
                <div>
                    <Field
                        name="address"
                        component="input"
                        type="text"
                        placeholder="Address"
                    />
                </div>
            </div>
            <div>
                <label>Code postal</label>
                <div>
                    <Field
                        name="postCode"
                        component="input"
                        type="text"
                        placeholder="Post code"
                    />
                </div>
            </div>
            <div>
                <label>Town</label>
                <div>
                    <Field
                        name="town"
                        component="input"
                        type="text"
                        placeholder="Town"
                    />
                </div>
            </div>
            <div>
                <label>Surface</label>
                <div>
                    <Field
                        name="surface"
                        component="input"
                        type="number"
                        placeholder="Surface"
                        parse={value => Number(value)}
                    />
                </div>
            </div>
            <div>
                <label>Chambres</label>
                <div>
                    <Field
                        name="rooms"
                        component="input"
                        type="number"
                        placeholder="Rooms"
                        parse={value => Number(value)}
                    />
                </div>
            </div>
            <div>
                <label>Négociation</label>
                <div>
                    <Field
                        name="negociation"
                        component="input"
                        type="checkbox"
                    />
                </div>
            </div>
            <div>
                <label>Price</label>
                <div>
                    <Field
                        name="price"
                        component="input"
                        type="number"
                        placeholder="Price"
                        parse={value => Number(value)}
                    />
                </div>
            </div>
            <div>
                <label>Notes</label>
                <div>
                    <Field name="comment" component="textarea" />
                </div>
            </div>
            <div>
                <label>A vendre depuis</label>
                <div>
                    <Field
                        name="toSellSince"
                        component="input"
                        type="date"
                        placeholder="depuis"
                    />
                </div>
            </div>
            <div>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'house',
})(HouseForm);