import React, { Component } from "react";
// import './App.css';

class DependenTree extends Component {
  constructor(props) {
    super(props);
    this.state = { pkg: props.pkg, hidden: this.props.hidden };
    this.toggleTree = this.toggleTree.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ ...this.state, pkg: props.pkg });
  }

  toggleTree(elem) {
    this.setState({ ...this.state, hidden: !this.state.hidden });
  }
  render() {
    const trees = [];
    if (!this.state.pkg) {
      return <div> </div>;
    }
    const dependencies = this.state.pkg.dependencies;
    dependencies.forEach(dependency => {
      if (dependency.dependencies && dependency.dependencies.length > 0) {
        trees.push(
          <DependenTree
            pkg={dependency}
            hidden={true}
            key={dependency.name + dependency.version}
          />
        );
      } else {
        trees.push(
          <li className="leaf" key={dependency.name + dependency.version}>
            {dependency.name}: {dependency.version}
          </li>
        );
      }
    });

    return (
      <li>
        <span
          onClick={this.toggleTree}
          style={{
            cursor: "pointer",
            fontWeight: this.state.hidden ? "bold" : "normal"
          }}
        >
          {this.state.pkg.name}: {this.state.pkg.version}
        </span>
        <ul style={{ display: this.state.hidden ? "none" : "" }}>{trees}</ul>
      </li>
    );
  }
}

export default DependenTree;
