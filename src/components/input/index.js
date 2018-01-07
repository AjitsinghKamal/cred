import React, { Component } from 'react';
import './style.scss';
import { fetchData } from '../../actions/index';

import { connect } from 'react-redux'

class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {input: this.props.activeUrl};
		this.startDispatch = this.startDispatch.bind(this);
	}

	updateUrl(event) {
		this.setState({
			input: event.target.value
		})
	}

	startDispatch() {
		this.props.refresh(this.state.input);
	}

	render() {
		return (
			<div className="c-input">
				<button onClick={this.startDispatch} >
					<img className="icon" src={require('../../refresh-icon.png')} alt=""/>
				</button>
				<input type="text" name="apiBox" className="api-box" placeholder="api to fetch...." value={ this.state.input} onChange={event => this.updateUrl(event)}/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		activeUrl: state.list.url
	}
}


const mapDispatchToProps = dispatch => {
	return {
		refresh: (input) => {
			return dispatch(fetchData(input));
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Input)