import React, { Component } from "react";
// import './App.css';

class PackageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setVersions = props.setVersions
    this.setPackage = props.setPackage
  }

  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this.setPackage(e.target.value)
      this.setVersions([])
      fetch(`http://localhost:3000/versions?packageName=${e.target.value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          return response.json();
        })
        .then(versions => {
          this.setVersions(versions);
        });
    }
  };

  render() {
    return <input type="text" onKeyPress={this._handleKeyPress} />;
  }
}

class VersionSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { versions: props.versions, disabled: true };
    this.onChange = this.onChange.bind(this)
    this.selectVersion = props.selectVersion
  }

  componentWillReceiveProps(props){
    this.setState({...this.state, versions: props.versions, disabled: false})
  }

  onChange(e){
    const version = e.target.value
    this.setState({...this.state, disabled: false})
    console.log(version)
    this.selectVersion(version)
  }

  render() {
    return <select onChange={this.onChange} defaultValue="" disabled={this.state.disabled ? 'disabled' : ''}>
        <option value="">
          Choose a version
        </option>
        <option value="latest">
          latest
        </option>
        {this.state.versions.map(version => {
          return <option value={version} key={version}>
              {version}
            </option>;
        })}
      </select>;
  }
}

class DependenSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { versions: [] };
    this.setVersions = this.setVersions.bind(this);
    this.setPackage = props.setPackage;
    this.selectVersion = props.selectVersion
  }

  setVersions(versions) {
    this.setState({ ...this.state, versions });
  }



  render() {
    return (
      <div className="searchWrapper">
        <PackageInput setVersions={this.setVersions} setPackage={this.setPackage} />
        <VersionSelect versions={this.state.versions} selectVersion={this.selectVersion} />
      </div>
    );
  }
}

export default DependenSearch;
