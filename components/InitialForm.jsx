import React from 'react';

class InitialForm extends React.Component {
  render() {
    const options = [];
    for (var i = 0; i < this.props.presets.length; i++) {
      var option = this.props.presets[i];
      options.push(
        <option value={i} key={i}>{option.name}</option>
      );
    }

    return (
      <div className="initial-form well">
        <h2>Input aspect ratio</h2>
        <div>
          <select 
            onChange={this.props.onPresetSelection}
            className="form-control"
          >
            {options}
          </select>
        </div>
        <div>
          <label htmlFor="input1">Width</label>
          <input 
            type="number" 
            id="input1"
            ref="input1"
            className="form-control"
            onChange={this.props.onValueChanged} 
            value={this.props.valueW} 
          />
        </div>
        <div>
          <label htmlFor="input2">Height</label>
          <input 
            type="number" 
            id="input2"
            ref="input2"
            className="form-control"
            onChange={this.props.onValueChanged} 
            value={this.props.valueH} 
          />
        </div>
        {this.props.ratioInfo}
      </div>  
    );
  }
};

module.exports = InitialForm;
