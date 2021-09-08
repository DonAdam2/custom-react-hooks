import React from 'react';
//custom hooks
import useCopyToClipboard from '../../customHooks/UseCopyToClipboard';

const CopyButton = ({ text }) => {
	const [isCopied, handleCopy] = useCopyToClipboard();

	return (
		<button className="copy-to-clipboard-button" onClick={() => handleCopy(text)}>
			{isCopied ? <i className="fas fa-clipboard-check" /> : <i className="fas fa-copy" />}
		</button>
	);
};

export default CopyButton;
