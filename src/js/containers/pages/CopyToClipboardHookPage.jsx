//components
import CopyButton from '../../components/shared/CopyButton';

const CopyToClipboardHookPage = () => {
  const text = 'Code of the use copy to clipboard hook';

  return (
    <div className="magnify-container">
      <p>
        This hook allows you to copy text to the clipboard and shows a confirmation toast on success
      </p>
      <p>
        {text} <CopyButton text={text} />
      </p>
    </div>
  );
};

export default CopyToClipboardHookPage;
