import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class PostsNew extends Component {
  render() {
    // use props injected by redux form
    const {
      fields: { title, categories, content },
      handleSubmit
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h3 className="text-danger">Make a new post!</h3>
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" {...title} />
          </div>

          <div className="form-group">
            <label>Categories</label>
            <input type="text" className="form-control" {...categories} />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea className="form-control" {...content} />
          </div>

          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
    );
  }
}

// configure redux form
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content']
})(PostsNew);
