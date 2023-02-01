//custom hooks
import useDocumentTitle from '../../customHooks/UseDocumentTitle';

const DocumentTitleHookPage = () => {
  useDocumentTitle('Document title hook');

  return (
    <div className="magnify-container">
      <p>Look at the title of the page</p>
    </div>
  );
};

export default DocumentTitleHookPage;
