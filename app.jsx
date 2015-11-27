import React from 'react';
 
var AspectRatioForm = React.createClass({
  render: function(){
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
});

var FormContainer = React.createClass({
  getInitialState: function() {
    return {
      valueW: 4,
      valueH: 3,
      calcW: null,
      calcH: null,
      presets: [
        {
          name: 'Select preset'
        },
        {
          name: '1:1',
          width: 1,
          height: 1
        },
        {
          name: '3:2 (landscape)',
          width: 3,
          height: 2
        },
        {
          name: '2:3 (portrait)',
          width: 2,
          height: 3
        },
        {
          name: '4:3 (landscape)',
          width: 4,
          height: 3
        },
        {
          name: '3:4 (portrait)',
          width: 3,
          height: 4
        },
        {
          name: '16:9 (landscape)',
          width: 16,
          height: 9
        },
        {
          name: '9:16 (portrait)',
          width: 9,
          height: 16
        },
        {
          name: '21:9 (landscape)',
          width: 21,
          height: 9
        },
        {
          name: '21:9 (portrait)',
          width: 9,
          height: 21
        }
      ]
    }
  },
  onPresetSelection: function(event) {
    var index = parseInt(event.target.value, 10);
    if (index !== 0) {
      var data = this.state.presets[index];
      this.setState({
        valueW: data.width,
        valueH: data.height,
        calcW: null,
        calcH: null
      });
    }
  },
  updateBase: function(event){
    var value = parseInt(event.target.value, 10);;
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
  },
  calculate: function(event) {
    var value = parseInt(event.target.value, 10);;
    if (event.target.id === 'input3') {
      var calcHeight = (this.state.valueH / this.state.valueW) * value;
      this.setState({
        calcW: value,
        calcH: calcHeight
      });
    } else if (event.target.id === 'input4') {
      var calcWidth = value / (this.state.valueH / this.state.valueW);
      this.setState({
        calcW: calcWidth,
        calcH: value
      });
    }
  },
  // http://rosettacode.org/wiki/Greatest_common_divisor#JavaScript
  // A is an integer array (e.g. [-50,25,-45,-18,90,447])
  greatestCommonDivisor: function(arr) {
    var i, y,
        n = arr.length,
        x = Math.abs(arr[0]);
   
    for (i = 1; i < n; i++) {
      y = Math.abs(arr[i]);
   
      while (x && y) {
        (x > y) ? x %= y : y %= x;
      }
      x += y;
    }
    return x;
  },
  render: function(){
    var ratio = this.state.valueW / this.state.valueH;
    var ratioInfo = (
      <p>
        Ratio: {ratio}
      </p>
    );
    
    var lcd = this.greatestCommonDivisor([this.state.valueW, this.state.valueH]);
    var lcdInfo = (
      <p>
        Least common divider: {this.state.valueW / lcd} : {this.state.valueH / lcd}
      </p>
    );
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
});

var PreviewModel = React.createClass({
  render: function(){
    var width = this.props.width;
    var height = this.props.height;
    var percentWidth = 100;
    var percentHeight = 100;

    if (width > height) {
      percentHeight = 100 / width * height;
    } else {
      percentWidth = 100 / height * width;
    }

    var styleString = {
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
});

var InitialForm = React.createClass({
  render: function(){
    var options = [];
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
});

var ResultForm = React.createClass({
  render: function() {
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
            value={this.props.calcW} 
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
            value={this.props.calcH} 
          />
        </div>
        {this.props.lcdInfo}
      </div>
    );
  }
});

React.render(
  <AspectRatioForm />,
  document.getElementById('root')
);
