import React from 'react';
import './ArticlesTable.css'
import PropTypes from 'prop-types';

const ArticlesTable = (props) => {
  let rowsData = (
    <tr>
      <td colSpan={2}>
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
        </tr>
      );}
    );
  }

  return (
    <div className="ArticlesTable">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {rowsData}
        </tbody>
      </table>
    </div>
  )

};

ArticlesTable.defaultProps = {
  rows: []
}

ArticlesTable.propTypes = {
  rows: PropTypes.array,
}

export default ArticlesTable;
