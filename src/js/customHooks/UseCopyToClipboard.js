import React, { useCallback, useState } from 'react';
//copy to clipboard
import copy from 'copy-to-clipboard';

const useCopyToClipboard = () => {
	const [isCopied, setCopied] = useState(false);

	const handleCopy = useCallback((text) => {
		if (typeof text === 'string' || typeof text == 'number') {
			copy(text.toString());
			setCopied(true);
		} else {
			setCopied(false);
			console.error(`Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`);
		}
	}, []);

	return [isCopied, handleCopy];
};

export default useCopyToClipboard;
