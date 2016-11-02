/* @flow */
import React from 'react';
import classnames from 'classnames';

const Editable = (props:{
		editing?: boolean,
		value?: string,
		onEdit?: Function,
		className?: string
	}) => {
	const {editing, className, value, onEdit} = props;
  if(editing) {
    return <Edit class={className} value={value} onEdit={onEdit} />;
  }
  return <Editable.Value value={value} />;
};

Editable.Value = ({value,className, ...props}) => <span class={classnames('value',className)} {...props}>{value}</span>

class Edit extends React.Component {
	render(){
		const {className,value,onEdit, ...props} = this.props;
		return <input
			type="text"
			class={classnames('edit', className)}
			autoFocus={true}
			defaultValue={value}
			onBlur={this.finishEdit}
			onKeyPress={this.checkEnter}
			{...props} />
	}
	checkEnter = (e) => {
		if (e.key === 'Enter') {
			this.finishEdit(e);
		}
	}
	finishEdit = (e) => {
		const value = e.target.value;
		if (this.props.onEdit) {
			this.props.onEdit(value);
		}
	}
}

Editable.Edit = Edit;

export default Editable;