import React from 'react';


const Hook = ({ comments }) => {

  const renderedComments = comments.map(comment => {
    let content = comment.content;
    switch (comment.status) {
      case 'pending':
        content = <i>{'Comment is pending.'}</i>;
        break;
      case 'rejected':
        content = <i>{'Comment is rejected.'}</i>;
        break;
    }
    return (<li key={comment.id}>{content}</li>);
  });

  return (
    <ul>
      {renderedComments}
    </ul>
  );
};

export default Hook;
