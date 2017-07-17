import React, { Component } from 'react';
import ArticlesTable from './ArticlesTable';
import PostForm from './ArticlesPostForm';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            articles: [],
        };

        this.deleteArticle = this.deleteArticle.bind(this);
        this.createArticle = this.createArticle.bind(this);
    }

    componentDidMount() {
        return fetch("http://127.0.0.1:5000/articles/")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                articles: responseJson,
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    deleteArticle(aid) {
        if (window.confirm("Are you sure you want to delete the element?")) {
            fetch(`http://127.0.0.1:5000/articles/${aid}`, {
                method: "DELETE",
            })
            .then((response) => {
                this.setState({
                    articles: this.state.articles.filter((e) => e.aid !== aid)
                });
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    createArticle(data) {
        return fetch("http://127.0.0.1:5000/articles/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
           },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            let newArticles = this.state.articles.slice();
            newArticles.push(responseJson);

            this.setState({
                articles: newArticles,
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div>Loading...</div>
            )
        } else {
            return (
                <div>
                    <ArticlesTable rows={this.state.articles} deleteArticle={this.deleteArticle} />
                    <PostForm createArticle={this.createArticle} />
                </div>
            );
        }
    }
}

export default App;
