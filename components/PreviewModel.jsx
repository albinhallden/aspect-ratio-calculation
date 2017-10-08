import React from 'react';

class PreviewModel extends React.Component {
  render() {
    const width = this.props.width;
    const height = this.props.height;
    let percentWidth = 100;
    let percentHeight = 100;

    if (width > height) {
      percentHeight = 100 / width * height;
    } else {
      percentWidth = 100 / height * width;
    }

    const styleString = {
      width: percentWidth + '%',
      height: percentHeight + '%'
    }

    return (
      <div className="well preview-model">
        <div className="preview-model__container">
          <div 
            className="preview-model__model"
            style={styleString}>
            <span className="preview-model__text">
              {this.props.width}:{this.props.height}
            </span>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = PreviewModel;
