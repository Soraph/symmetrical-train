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
  }

  quickChangeState(who, what) {
    this.setState({
      [who]: what
    });
  }

  handleInputChange(event) {
      this.validateForm();

      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.quickChangeState(name, value);
  }

  validateForm() {
    this.quickChangeState('invalidTitle', this.state.title.trim() ? false : true);
    this.quickChangeState('invalidContent', this.state.content.trim() ? false : true);
  }

  render () {
    return (
      <form className="ArticleForm" onSubmit={
        (e) => {
          e.preventDefault();
          if (this.state.title.trim() && this.state.content.trim()) {
            this.validateForm();

            this.props.handleArticle(this.state)
            .then((response) => {
              this.setState({
                aid: this.state.aid,
                title: '',
                content: '',
              });
            })
          } else {
            this.validateForm();
          }
        }
      }>
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

export default ArticleForm;
