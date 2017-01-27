import React from 'react';
import { connect } from 'react-redux';
import MagicHomeView from '~/components/views/MagicHomeView';

class MagicHome extends React.Component {
	render() {
		return <MagicHomeView posts={this.props.posts} />
	}
};

const mapStateToProps = (state, ownProps) => {
	return {
		posts: state.posts
	}	
};

export default connect(mapStateToProps)(MagicHome);