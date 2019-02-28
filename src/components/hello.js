import React from "react";

class Hello extends React.Component {
  render(){
    return <div>Hello {this.props.firstName} {this.props.lastName}!</div>;
  }
}

export default Hello;
