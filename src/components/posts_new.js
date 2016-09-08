import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { createPost } from '../actions/index';

class PostsNew extends Component {
  render() {
    // use props injected by redux form
    const {
      fields: { title, categories, content },
      handleSubmit
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.props.createPost)}>
          <h3 className="text-danger">Make a new post!</h3>
          <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
            <label>Title</label>
            <input type="text" className="form-control" {...title} />
            <div className="text-help">
              {title.touched ? title.error : ''}
            </div>
          </div>

          <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
            <label>Categories</label>
            <input type="text" className="form-control" {...categories} />
            <div className="text-help">
              {categories.touched ? categories.error : ''}
            </div>
          </div>

          <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
            <label>Content</label>
            <textarea className="form-control" {...content} />
            <div className="text-help">
              {content.touched ? content.error : ''}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
    );
  }
}

// Form Validation Function
function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title';
  }

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
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
