import React from 'react';

import { storiesOf } from '@storybook/react';
import { action, decorateAction } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import StoryRouter from 'storybook-router';
import Home from '../components/Home';
import App from '../components/App';
import ArticlesTable from '../components/ArticlesTable';
import ArticleForm from '../components/ArticleForm';

const handleArticle = (state) => {
  return new Promise((s, f) => {
    action('Handle article')(state);
    s();
  });
}

const articleModified = () => {
  action('Article modified')
  return true;
}

storiesOf('ArticleForm', module)
.add('with no data supplied', () => {
  const params = {
    handleArticle,
    articleModified
  }
  return (
    <ArticleForm {...params} />
  );
})
.add('with article supplied', () => {
  const params = {
    aid: 'lorem-ipsum-123-456',
    title: 'Title 1',
    content: 'Content 1',
    handleArticle,
    articleModified
  }

  return (
    <ArticleForm {...params} />
  );
});

storiesOf('ArticlesTable', module)
.add('with 2 articles', () => {
  const rows = [
    {
      aid: '123321312',
      title: 'Title 1',
      content: 'Content 1'
    },
    {
      aid: '23223131',
      title: 'Title 2',
      content: 'Content 2'
    }
  ];

  const params= {
    rows,
    modifyArticle: action('modifyArticle trigger'),
    deleteArticle: action('deleteArticle trigger')
  }

  return (
    <ArticlesTable {...params} />
  );
})
.add('with 1 article', () => {
  const rows = [
    {
      aid: '123321312',
      title: 'Title 1',
      content: 'Content 1'
    }
  ];

  const params= {
    rows,
    modifyArticle: action('modifyArticle trigger'),
    deleteArticle: action('deleteArticle trigger')
  }

  return (
    <ArticlesTable {...params} />
  );
})
.add('with no articles', () => {
  const rows = [];

  const params= {
    rows,
    modifyArticle: action('modifyArticle trigger'),
    deleteArticle: action('deleteArticle trigger')
  }

  return (
    <ArticlesTable {...params} />
  )
});

storiesOf('Home', module)
.add('with no articles', () => (
  <Home />
))
.add('with articles', () => {
  let articles = [
    {
      aid: '123321312',
      title: 'Title 1',
      content: 'Content 1'
    },
    {
      aid: '23223131',
      title: 'Title 2',
      content: 'Content 2'
    }
  ];

  const handleArticleV2 = (state) => {
    return new Promise((s, f) => {
      action('Handle article V2')(state);
      articles[articles.indexOf(
        articles.find(el => {
          return el.aid === state.aid
        })
      )] = {
        aid: state.aid,
        title: state.title,
        content: state.content
      }
      s();
    });
  }

  return (
    <Home articles={articles} handleArticle={handleArticleV2} />
  )
});


storiesOf('App', module)
.addDecorator(StoryRouter({'/about': linkTo('App', 'about')}))
.add('home', () => (
  <App>
    <Home />
  </App>
));
