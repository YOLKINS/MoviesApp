import React, { Component } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';
const { Search } = Input;

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      label: '',
    };
  }

  debouncedSearch = debounce(async (valueName) => {
    await this.props.searchItem(valueName);
    this.setState({ label: '' });
  }, 500);

  onLabelHandleChange = async (e) => {
    this.setState({
      label: e.target.value,
    });
    this.debouncedSearch(this.state.label);
  };

  render() {
    const { placeholder } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <Search placeholder={placeholder} onChange={this.onLabelHandleChange} value={this.state.label} />
      </form>
    );
  }
}
