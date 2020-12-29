import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ config }) => {
	return ReactDOM.createPortal(
		<div className="ui dimmer modals visible active" onClick={() => config.onReturnClick()}>
			<div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
				<div className="header">{config.headerText}</div>
				<div className="content">{config.contentText}</div>
				<div className="actions">
					{config.actionButton}
					<button className="ui button" onClick={() => config.onReturnClick()}>
						Cancel
					</button>
				</div>
			</div>
		</div>,
		document.querySelector('#modal')
	);
};

export default Modal;
