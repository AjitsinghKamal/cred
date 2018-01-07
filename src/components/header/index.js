import React, {Component} from 'react';
import './style.scss';

import Input from '../input/index';

class Header extends Component {
	render() {
		return (
			<header className="head">
				<Input />
				<nav className="head_nav">
					<a className="head_nav__link" href="https://github.com/AjitsinghKamal/cred.git">
						<img className="icon" src={require('../../github-icon.png')} alt="github logo"/>
					</a>
				</nav>
			</header>
		)
	}
}

export default Header;