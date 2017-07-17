import React, { Component } from 'react';

class PostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <form onSubmit={
                (e) => {
                        e.preventDefault();
                        if (this.state.title.trim() && this.state.content.trim()) {
                            this.props.createArticle(this.state)
                            .then((response) => {
                                this.setState({
                                    title: '',
                                    content: '',
                                });
                            })
                        }
                    }
                }>
                <fieldset>
                    <legend>Create a new article</legend>

                    <div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title for the article"
                            value={this.state.title}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            name="content"
                            placeholder="Content for the article"
                            value={this.state.content}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div>
                        <button>Submit</button>
                    </div>
                </fieldset>
            </form>
        );
    }
}

export default PostForm;
