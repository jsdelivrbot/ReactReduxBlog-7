import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class PostsNew extends Component {
  renderField = field => {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  };
  onSubmit(values) {
    console.log(values);
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name="title" label="Title" component={this.renderField} />
        <Field name="categories" label="Categories" component={this.renderField} />
        <Field name="content" label="Post content" component={this.renderField} />
        <button type="submit" className="btn btn-primary">
          {' '}
          Submit
        </button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}
function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Enter a title that has at least 3  character';
  }
  if (!values.categories) {
    errors.categories = 'Enter a category';
  }
  if (!values.content) {
    errors.content = 'Enter some content';
  }
  //if errors is empty the form is fine to sudmit
  //if errors has properties - it is not valued
  return errors;
}
export default reduxForm({
  validate, // validate:validate,
  form: 'PostsNewForm'
})(PostsNew);
