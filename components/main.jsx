import React from 'react';
import ReactDOM from 'react-dom';

import FormContainer from './FormContainer.jsx';

class Main extends React.Component {
  render() {
    return (
      <div className="aspect-ratio-form">
        <h1>Aspect ratio calculator</h1>
        <p>Calculate width or height depending on a specified aspect ratio.</p>
        <h2>Instructions</h2>
        <ol>
          <li>Input base dimensions into dimension form.</li>
          <li>Add either width or height into result form to calculate.</li>
          <li>Bookmark this page if you want to use it again.</li>
        </ol>
        <hr />
        <FormContainer />
        <p>
          Created by <a href="http://ahallden.se">Albin Halldén</a>
        </p>
      </div>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);