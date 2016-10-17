
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FontAwesome from 'react-fontawesome'
import SpotifyAuthenticationFrame from '../components/SpotifyAuthenticationFrame'
import ConfirmationButton from '../components/ConfirmationButton'

import * as mopidyActions from '../services/mopidy/actions'
import * as spotifyActions from '../services/spotify/actions'

class Settings extends React.Component{

	constructor(props) {
		super(props);

		this.state = {
			mopidy_host: this.props.mopidy.host,
			mopidy_port: this.props.mopidy.port
		};
	}

	resetAllSettings(){
		localStorage.clear();
		window.location.reload(true);
	}

	setConfig(){
		this.props.mopidyActions.setConfig( this.state.mopidy_host, this.state.mopidy_port );
		window.location.reload(true);
	}

	render(){
		return (
			<div>
				<h3>Settings</h3>
				<h4>Mopidy</h4>
				<form onSubmit={() => this.setConfig()}>
					<label>
						<span className="label">Host</span>
						<input onChange={ e => this.setState({ mopidy_host: e.target.value })} value={ this.state.mopidy_host } />
					</label>
					<label>
						<span className="label">Port</span>
						<input onChange={ e => this.setState({ mopidy_port: e.target.value })} value={ this.state.mopidy_port } />
					</label>
					<button type="submit">Apply</button>
				</form>
				<h4>Spotify</h4>
		        <SpotifyAuthenticationFrame />
		        <ConfirmationButton content="Reset all settings" confirmingContent="Are you sure?" onConfirm={() => this.resetAllSettings()} />
			</div>
		);
	}
}


/**
 * Export our component
 *
 * We also integrate our global store, using connect()
 **/

const mapStateToProps = (state, ownProps) => {
	return state;
}

const mapDispatchToProps = (dispatch) => {
	return {
		mopidyActions: bindActionCreators(mopidyActions, dispatch),
		spotifyActions: bindActionCreators(spotifyActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)