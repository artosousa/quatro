import React from "react";
import "./storage.css";

class Storage extends React.Component {
  handleClick = () => {
    this.props.selectStorage(this.props.storage);
  }
  render() {
    const style = {
      backgroundImage : `url('${this.props.storage.imageUrl}')`
    };
    return (
      <div className="storage-unit" onClick={this.handleClick} >
        <div className="storage-unit-picture" style={style}>
          <div className="storage-unit-price">
            {this.props.storage.price}
          </div>
        </div>
        <div className="storage-unit-title">
          {this.props.storage.name}
        </div>
      </div>
    );
  }
}

export default Storage;
