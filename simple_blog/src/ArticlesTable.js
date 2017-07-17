import React from 'react';

function ArticlesTable(props) {
    const rowsData = props.rows.map(el => (
            <tr key={el.aid}>
                <td>{el.title}</td>
                <td>{el.content}</td>
                <td><button onClick={() => props.deleteArticle(el.aid)}>Delete</button></td>
            </tr>
        )
    );

    return (
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
    );
}

export default ArticlesTable;
