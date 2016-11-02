import React from 'react';
import Lane from './Lane';
import LaneActions from '../actions/LaneActions';

const Lanes = ({lanes}) => (
	<div class="lanes">
		{lanes.map(lane =>
			<Lane class="lane" key={lane.id} lane={lane} onMove={LaneActions.laneMove} />
		)}
	</div>
)

Lanes.propTypes = {
	lanes: React.PropTypes.array
};

Lanes.defaultProps = {
	lanes: []
};

export default Lanes;