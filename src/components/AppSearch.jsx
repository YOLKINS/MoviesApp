import React, { Component } from 'react';
import { Input } from 'antd';
const { Search } = Input;

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      label: '',
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.searchItem(this.state.label);
    this.setState({ label: '' });
  };

  render() {
    const { placeholder } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <Search placeholder={placeholder} onChange={this.onLabelChange} value={this.state.label} />
      </form>
    );
  }
}
