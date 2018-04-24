import React from 'react';
import { Field, reduxForm } from 'redux-form';


import './ClientForm.less';

/*
id: Option[Int],
  firstName: Option[String],
  lastName: Option[String],
  email: Option[String],
  comment: Option[String],
  searchSince: Option[Date],
  surfaceMin: Option[BigDecimal],
  roomsMin: Option[Int],
  maxPrice: Option[BigDecimal],
  createadAt: Option[Date],
  updatedAt: Option[Date])
* */

const ClientForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name</label>
                <div>
                    <Field
                        name="firstName"
                        component="input"
                        type="text"
                        placeholder="First Name"
                    />
                </div>
            </div>
            <div>
                <label>Last Name</label>
                <div>
                    <Field
                        name="lastName"
                        component="input"
                        type="text"
                        placeholder="Last Name"
                    />
                </div>
            </div>
            <div>
                <label>Email</label>
                <div>
                    <Field
                        name="email"
                        component="input"
                        type="email"
                        placeholder="Email"
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
                <label>Cherche depuis</label>
                <div>
                    <Field
                        name="searchSince"
                        component="input"
                        type="date"
                        placeholder="depuis"
                    />
                </div>
            </div>
            <div>
                <label>Surface min</label>
                <div>
                    <Field
                        name="surfaceMin"
                        component="input"
                        type="number"
                        placeholder="Surface min"
                        parse={value => Number(value)}
                    />
                </div>
            </div>
            <div>
                <label>Chambres min</label>
                <div>
                    <Field
                        name="roomsMin"
                        component="input"
                        type="number"
                        placeholder="Chambres min"
                        parse={value => Number(value)}
                    />
                </div>
            </div>
            <div>
                <label>Prix maxi</label>
                <div>
                    <Field
                        name="maxPrice"
                        component="input"
                        type="number"
                        placeholder="Prix maxi"
                        parse={value => Number(value)}
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
    form: 'client', // a unique identifier for this form
})(ClientForm);