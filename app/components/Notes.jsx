import React from 'react';
import Note from './Note';
import Editble from './Editable';
import LaneActions from '../actions/LaneActions';


const Notes = ({
		notes, onNoteClick, onEdit, onDelete
	}) => (
		<ul class="notes">
			{notes.map(({id,editing,task}) =>
				<li key={id}>
					<Note
						class="note"
						id={id}
						editing={editing}
						onClick={onNoteClick.bind(null,id)}
						onMove={LaneActions.move} >
						<Editble
							class="editable"
							editing={editing}
							value={task}
							onEdit={onEdit.bind(null,id)}
						/>
						<button class="delete" onClick={onDelete.bind(null,id)}>x</button>
					</Note>
				</li>
			)}
		</ul>
);

Notes.propTypes = {
  notes: React.PropTypes.array,
  onEdit: React.PropTypes.func,
  onDelete: React.PropTypes.func,
  onNoteClick: React.PropTypes.func
};
Notes.defaultProps = {
  notes: [],
  onEdit: () => {},
  onDelete: () => {},
  onNoteClick: () => {}
};

export default Notes;