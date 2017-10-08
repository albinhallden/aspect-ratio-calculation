import React from 'react';

import PreviewModel from './PreviewModel.jsx';
import InitialForm from './InitialForm.jsx';
import ResultForm from './ResultForm.jsx';

const getViewportMode = (width, height) => {
  if (width === height) return '';
  return ` (${width > height ? 'landscape' : 'portrait'})`;
};

const getPreset = (width, height) => ({
  width,
  height,
  name: `${width}:${height}${getViewportMode(width, height)}`,
})

class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueW: 4,
      valueH: 3,
      calcW: null,
      calcH: null,
      presets: [
        {
          name: 'Select preset'
        },
        getPreset(1, 1),
        getPreset(3, 2),
        getPreset(2, 3),
        getPreset(4, 3),
        getPreset(3, 4),
        getPreset(16, 9),
        getPreset(9, 16),
        getPreset(21, 9),
        getPreset(9, 21),
      ]
    };

    this.onPresetSelection = this.onPresetSelection.bind(this);
    this.updateBase = this.updateBase.bind(this);
    this.calculate = this.calculate.bind(this);
    this.greatestCommonDivisor = this.greatestCommonDivisor.bind(this);
  }

  onPresetSelection(event) {
    const index = parseInt(event.target.value, 10);
    if (index !== 0) {
      const { width, height } = this.state.presets[index];
      this.setState({
        valueW: width,
        valueH: height,
        calcW: null,
        calcH: null
      });
    }
  }

  updateBase(event) {
    const value = parseInt(event.target.value, 10);;
    if (event.target.id === 'input1') {
      this.setState({
        valueW: value,
        calcW: null,
        calcH: null
      });
    } else if (event.target.id === 'input2') {
      this.setState({
        valueH: value,
        calcW: null,
        calcH: null
      });
    }
  }

  calculate(event) {
    const value = parseInt(event.target.value, 10);;
    if (event.target.id === 'input3') {
      const calcHeight = (this.state.valueH / this.state.valueW) * value;
      this.setState({
        calcW: value,
        calcH: calcHeight
      });
    } else if (event.target.id === 'input4') {
      const calcWidth = value / (this.state.valueH / this.state.valueW);
      this.setState({
        calcW: calcWidth,
        calcH: value
      });
    }
  }

  greatestCommonDivisor(array) {
    // http://rosettacode.org/wiki/Greatest_common_divisor#JavaScript
    // A is an integer array (e.g. [-50,25,-45,-18,90,447])
    let i, 
        y,
        n = array.length,
        x = Math.abs(array[0]);
   
    for (i = 1; i < n; i++) {
      y = Math.abs(array[i]);
   
      while (x && y) {
        (x > y) ? x %= y : y %= x;
      }
      x += y;
    }
    return x;
  }

  render() {
    const ratioInfo = (<p>Ratio: {this.state.valueW / this.state.valueH}</p>);
    const lcd = this.greatestCommonDivisor([this.state.valueW, this.state.valueH]);
    const lcdInfo = (<p>Least common divider: {this.state.valueW / lcd} : {this.state.valueH / lcd}</p>);
    
    return (
      <div className="form">
        <InitialForm 
          onValueChanged={this.updateBase} 
          valueW={this.state.valueW}
          valueH={this.state.valueH}
          ratioInfo={ratioInfo}
          presets={this.state.presets}
          onPresetSelection={this.onPresetSelection} />
        <ResultForm 
          onValueChanged={this.calculate}
          calcW={this.state.calcW}
          calcH={this.state.calcH}
          lcdInfo={lcdInfo} />
        <PreviewModel 
          width={this.state.valueW}
          height={this.state.valueH} />
      </div>
    );
  }
}

module.exports = FormContainer;
