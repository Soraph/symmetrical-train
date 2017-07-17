import React, { Component } from 'react';
import './ArticleForm.css'

class ArticleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aid: this.props.aid,
      title: this.props.title,
      content: this.props.content,
      invalidTitle: false,
      invalidContent: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.aid !== this.props.aid) {
        this.setState({
          aid: nextProps.aid,
          title: nextProps.title,
          content: nextProps.content
        })
      }
  }

  quickChangeState(who, what) {
    this.setState({
      [who]: what
    });
  }

  handleInputChange(e) {
    this.validateForm();

    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.quickChangeState(name, value);
  }

  validateForm() {
    this.quickChangeState('invalidTitle', this.state.title.trim() ? false : true);
    this.quickChangeState('invalidContent', this.state.content.trim() ? false : true);
  }

  formSubmit(e)  {
    e.preventDefault();
    this.validateForm();

    if (!this.state.invalidTitle && !this.state.invalidContent) {
      this.props.handleArticle(this.state)
      .then((response) => {
        this.props.articleModified();
      })
    }
  }

  render () {
    return (
      <form className="ArticleForm" onSubmit={this.formSubmit}>
        <input type="hidden" name="aid" value={this.state.aid} />
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title for the article"
            value={this.state.title}
            onChange={this.handleInputChange}
            className={this.state.invalidTitle ? 'invalid' : null}
          />
        </div>

        <div>
          <input
            type="text"
            name="content"
            placeholder="Content for the article"
            value={this.state.content}
            onChange={this.handleInputChange}
            className={this.state.invalidContent ? 'invalid' : null}
          />
        </div>

        <div>
          <button>Save</button>
        </div>
      </form>
    )
  }
}

ArticleForm.defaultProps = {
  aid: '',
  title: '',
  content: ''
}

export default ArticleForm;
