import React from 'react';
import { connect } from 'react-redux';
import MagicHomeView from '~/components/views/MagicHomeView';

class MagicHome extends React.Component {
	render() {
		return <MagicHomeView blogs={this.props.blogs} />
	}
};

const mapStateToProps = (state, ownProps) => {
	return {
		blogs: state.blogs
	}	
};

export default connect(mapStateToProps)(MagicHome);