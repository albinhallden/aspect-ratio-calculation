import React from 'react';

class ResultForm extends React.Component {
  render() {
    return (
      <div className="result-form well">
        <h2>Input either width or height</h2>
        <p>The value not inputed will be calculated.</p>
        <div>
          <label htmlFor="input3">Width</label>
          <input 
            type="number" 
            id="input3"
            ref="input3"
            className="form-control"
            onChange={this.props.onValueChanged} 
            value={this.props.calcW || ''} 
          />
        </div>
        <div>
          <label htmlFor="input4">Height</label>
          <input 
            type="number" 
            id="input4"
            ref="input4"
            className="form-control"
            onChange={this.props.onValueChanged} 
            value={this.props.calcH || ''} 
          />
        </div>
        {this.props.lcdInfo}
      </div>
    );
  }
};

module.exports = ResultForm;
