import React from 'react';
import './ArticlesTable.css'
import PropTypes from 'prop-types';

const ArticlesTable = (props) => {
  const emptyArticle = {
    aid: '',
    title: '',
    content: ''
  }

  let rowsData = (
    <tr>
      <td colSpan={3} className="empty">
        There are no articles!
      </td>
    </tr>
  );

  if (props.rows.length) {
    rowsData = props.rows.map(el => {
      return (
        <tr key={el.aid}>
          <td>{el.title}</td>
          <td>{el.content}</td>
          <td>
            <button
              type="button"
              onClick={() => props.modifyArticle(el)}>
                EDIT
              </button>
            <button
              type="button"
              onClick={() => props.deleteArticle(el)}>
                DELETE
              </button>
          </td>
        </tr>
      );}
    );
  }

  let newArticleButton = (
    <button
      type="button"
      onClick={() => props.createArticle(emptyArticle)}>
        Add new article
    </button>
  );

  if (props.isModifyingArticle) {
    newArticleButton = null;
  }

  return (
    <div className="ArticlesTable">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rowsData}
        </tbody>
      </table>
      {newArticleButton}
    </div>
  )

};

ArticlesTable.defaultProps = {
  rows: []
}

ArticlesTable.propTypes = {
  rows: PropTypes.array,
  modifyArticle: PropTypes.func,
  deleteArticle: PropTypes.func
}

export default ArticlesTable;
