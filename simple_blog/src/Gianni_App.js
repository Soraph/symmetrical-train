import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import trash from './trash.png';

const BASE_URL = 'http://localhost:5000';


class ArticlesTable extends Component {
  deleteArticle(aid) {
    fetch(`${BASE_URL}/articles/${aid}`, {method: 'DELETE'})
    .then(response => {
      if (response.ok) {
        this.props.articleDeleted(aid);
        return;
      }

      throw new Error(`Problem deleting the article "${aid}"`);
    })
  }

  render() {
    let message, content;
    if (this.props.articles.length === 0 && this.props.loaded) {
      message = 'Nessun articolo da mostrare'
    }
    else {
      const articles = this.props.articles.map((a) => {
        return (
          <tr key={a.aid}>
            <td>{a.title}</td>
            <td>{a.content}</td>
            <td>
              <img
                src={trash}
                className="trash"
                alt="elimina"
                onClick={() => this.deleteArticle(a.aid)} />
            </td>
          </tr>
        );
      });

      content = (
        <table>
          <thead>
            <tr>
              <th>Titolo</th>
              <th>Contenuto</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {articles}
          </tbody>
        </table>
      );
    }
    return (
      <div>
        <p>{message}</p>
        <div>{content}</div>
      </div>
    );
  }
}

ArticlesTable.propTypes = {
  articles: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  articleDeleted: PropTypes.func.isRequired,
};


class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };

    this.insertArticle = this.insertArticle.bind(this);
  }

  insertArticle(event) {
    event.preventDefault();
    fetch(`${BASE_URL}/articles/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Problem inserting the article`);
    })
    .then(jsonData => {
      this.props.articleInserted(jsonData);
      this.setState({
        title: '',
        content: ''
      })
    });
  }

  handleChange(who, what) {
    this.setState({[who]: what});
  }

  render() {
    const insertEnabled = this.state.title && this.state.content;

    return (
      <form>
        <label htmlFor="title">Titolo:</label>
        <input
          type="text" name="title"
          value={this.state.title}
          onChange={(e) => this.handleChange('title', e.target.value)}/>
        <label htmlFor="content">Contenuto:</label>
        <input
          type="text" name="content"
          value={this.state.content}
          onChange={(e) => this.handleChange('content', e.target.value)} />
        <button
          disabled={!insertEnabled}
          onClick={this.insertArticle}>
          Inserisci articolo
        </button>
      </form>
    )
  }
}

ArticleForm.propTypes = {
  articleInserted: PropTypes.func.isRequired
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {articles: [], loaded: false};
    this.articleDeleted = this.articleDeleted.bind(this);
    this.articleInserted = this.articleInserted.bind(this);
  }

  componentDidMount() {
    fetch(`${BASE_URL}/articles/`)
    .then(response => {
      if (response.ok)
        return response.json();
      throw new Error('Problem fetching the articles');
    })
    .then(jsonData => {
      this.setState({
        articles: jsonData,
        loaded: true
      });
    });
  }

  articleDeleted(aid) {
    let articles = this.state.articles.filter(a => a.aid !== aid);
    this.setState({articles});
  }

  articleInserted(data) {
    let articles = [...this.state.articles];
    articles.push(data);
    this.setState({articles});
  }

  render() {
    return (
      <div className="App">
        <ArticlesTable
          articles={this.state.articles}
          loaded={this.state.loaded}
          articleDeleted={this.articleDeleted} />
        <ArticleForm
          articleInserted={this.articleInserted} />
      </div>
    );
  }
}

export default App;
