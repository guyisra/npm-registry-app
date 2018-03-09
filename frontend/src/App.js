import React, { Component } from 'react'
import './App.css'
import DependenTree from './DependenTree'
import DependenSearch from './DependenSearch'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setPackageAndVersion = this.setPackageAndVersion.bind(this);
    this.selectVersion = this.selectVersion.bind(this);
    this.setPackage = this.setPackage.bind(this)
  }

  selectVersion(version) {
    this.setPackageAndVersion(this.state.packageName, version);
  }

  setPackage(packageName) {
    this.setState({ ...this.state, packageName });
  }
  setPackageAndVersion(packageName, version) {
    this.fetchPackage(packageName, version);
  }

  fetchPackage(packageName, version) {
    fetch(`http://localhost:3000/?packageName=${packageName}&version=${version}`)
      .then(response => {
        return response.json();
      })
      .then(packageDetails => {
        console.log(packageDetails)
        this.setState({ ...this.state, pkg: packageDetails });
      });
  }

  render() {
    return (
      <div className="wrapper">
          <DependenSearch selectVersion={this.selectVersion} setPackage={this.setPackage} />
        <ul className="tree">
          <DependenTree pkg={this.state.pkg} hidden={false} />
        </ul>
      </div>
    );
  }
}

export default App
