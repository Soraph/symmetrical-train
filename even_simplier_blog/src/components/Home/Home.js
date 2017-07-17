import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import ArticlesTable from '../ArticlesTable'
import ArticleForm from '../ArticleForm'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modifyArticle: false
    }

    this.modifyArticle = this.modifyArticle.bind(this);
    this.articleModified = this.articleModified.bind(this);
  }

  componentDidMount() {
    if (this.props.isLoading) {
      this.props.getArticlesAsync();
    }
  }

  articleModified() {
    this.setState({
      modifyArticle: false
    })
  }

  modifyArticle(element) {
    let opened = true;

    if (this.state.aid === element.aid)
      opened = false;

    this.setState({
      modifyArticle: opened,
      aid: element.aid,
      title: element.title,
      content: element.content
    });
  }

  render() {
    let form = null;

    if (this.props.isLoading) {
      return null;
    }

    if (this.state.modifyArticle) {
      const params = {
        aid: this.state.aid,
        title: this.state.title,
        content: this.state.content,
        handleArticle: this.props.handleArticle,
        articleModified: this.articleModified
      }

      form = (
        <ArticleForm {...params} />
      )
    }


    return (
      <div className="Home">
        <h2>Articles in the blog</h2>
        <ArticlesTable rows={this.props.articles} modifyArticle={this.modifyArticle} />
        {form}
      </div>
    );
  };
}

Home.defaultProps = {
  articles: []
}

Home.propTypes = {
  articles: PropTypes.array,
};

export default Home;
