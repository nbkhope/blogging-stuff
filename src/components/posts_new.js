import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import _ from 'lodash';

import { createPost } from '../actions/index';

// ['title', 'categories', 'content'];
const FIELDS = {
  title: {
    type: 'input',
    label: 'Title'
    // can also add validate: () =>  here for custom validation
  },
  categories: {
    type: 'input',
    label: 'Categories'
  },
  content: {
    type: 'textarea',
    label: 'Content'
  }
};

class PostsNew extends Component {
  // in order to have access to context
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // after the blog post has been created successfully
        this.context.router.push('/');
      });
  }

  // function passsed to lodash map always has paramters 'value' and 'key'
  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];

    return (
      <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
        <div className="form-control-feedback">
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    );
  }

  render() {
    // use props injected by redux form
    const {
      //fields: { title, categories, content },
      handleSubmit
    } = this.props;

    const formFields = _.map(FIELDS, this.renderField.bind(this));

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h3 className="text-danger">Make a new post!</h3>

          {formFields}

          <button type="submit" className="btn btn-primary">Create</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

// Form Validation Function
function validate(values) {
  const errors = {};

  // _.each(FIELDS, (type, field) => {
  //   if (!values[field]) {
  //     errors[field] = `Enter a ${field}`;
  //   }
  // });
  for (let field in values) {
    if (!values[field]) {
      errors[field] = `Enter a ${field}`;
    }
  }

  // if (!values.title) {
  //   errors.title = 'Enter a title';
  // }
  //
  if (!values.categories) {
    errors.categories = 'Enter at least one category';
  }

  if (!values.content) {
    errors.content = 'Enter some content for the post';
  }

  return errors;
}

// configure redux form
export default reduxForm({
  form: 'PostsNewForm',
  fields: Object.keys(FIELDS), // or _.keys(FIELDS)
  validate
}, null, { createPost })(PostsNew);
