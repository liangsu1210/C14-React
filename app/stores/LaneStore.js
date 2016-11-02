import update from 'react-addons-update';
import LaneActions from '../actions/LaneActions';

export default class LaneStore {
	constructor(){
		this.bindActions(LaneActions);
		this.lanes = [];
	}
	create(lane) {
		lane.notes = lane.notes || [];
		this.setState({
			lanes: this.lanes.concat(lane)
		});
	}
	update(updatedLane) {
		this.setState({
			lanes: this.lanes.map(lane => {
				if (lane.id === updatedLane.id) {
					return Object.assign({},lane,updatedLane);
				}
				return lane;
			})
		});
	}
	delete(id) {
		this.setState({
			lanes: this.lanes.filter(lane => lane.id !== id)
		});
	}
	attachToLane ({laneId,noteId}) {
		this.setState({
			lanes: this.lanes.map(lane => {
				if (lane.notes.includes(noteId)) {
					lane.notes = lane.notes.filter(note => note !== noteId);
				}
				if (lane.id === laneId) {
					lane.notes = lane.notes.concat([noteId]);
				}
				return lane;
			})
		});
	}
	detachFromLane ({laneId,noteId}) {
		this.setState({
			lanes: this.lanes.map(lane => {
				if (lane.id === laneId) {
					lane.notes = lane.notes.filter(note => note !== noteId);
				}
				return lane;
			})
		});
	}
	move({sourceId,targetId}){
		const lanes = this.lanes;
		const sourceLane = lanes.filter(lane => lane.notes.includes(sourceId))[0];
		const targetLane = lanes.filter(lane => lane.notes.includes(targetId))[0];
		const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
		const targetNoteIndex = targetLane.notes.indexOf(targetId);

		if (sourceLane === targetLane) {
			sourceLane.notes = update(sourceLane.notes,
				{
					$splice: [
						[sourceNoteIndex,1],
						[targetNoteIndex,0,sourceId]
					]
				});
		} else {
			sourceLane.notes.splice(sourceNoteIndex,1);
			targetLane.notes.splice(targetNoteIndex,0,sourceId);
		}

		this.setState({lanes});
	}
	laneMove({sourceId,targetId}){
		const lanes = this.lanes;
		const sourceLane = lanes.filter(lane => lane.id.includes(sourceId))[0];
		const targetLane = lanes.filter(lane => lane.id.includes(targetId))[0];
		const sourceLaneIndex = lanes.indexOf(sourceLane);
		const targetLaneIndex = lanes.indexOf(targetLane);

		lanes.splice(sourceLaneIndex,1);
		lanes.splice(targetLaneIndex,0,sourceLane);

		this.setState({lanes});
	}
}