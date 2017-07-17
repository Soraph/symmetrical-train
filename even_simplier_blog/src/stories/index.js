import React from 'react';

import { storiesOf } from '@storybook/react';
import { action, decorateAction } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import StoryRouter from 'storybook-router';
import Home from '../components/Home';
import App from '../components/App';
import ArticlesTable from '../components/ArticlesTable';
import ArticleForm from '../components/ArticleForm';

storiesOf('ArticleForm', module)
  .add('with no aid supplied', () => {
    const params = {
      aid: '',
      handleArticle: action('Handle article')
    }
    return (
      // Promises?
      <ArticleForm {...params} />
    );
  })
  .add('with aid supplied', () => {
    const params = {
      aid: 'lorem-ipsum-123-456',
      title: 'Title 1',
      content: 'Content 1',
      handleArticle: action('Handle article')
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

    return (
      <ArticlesTable rows={rows} />
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

    return (
      <ArticlesTable rows={rows} />
    );
  })
  .add('with no articles', () => {
    const rows = [];

    return (
        <ArticlesTable rows={rows} />
    )
  });

storiesOf('Home', module)
  .add('with counter', () => (
    <Home counter={10} increment={action('incremented')}/>
  ));


storiesOf('App', module)
  .addDecorator(StoryRouter({'/about': linkTo('App', 'about')}))
  .add('home', () => (
    <App>
      <Home counter={10} increment={action('incremented')}/>
    </App>
  ));