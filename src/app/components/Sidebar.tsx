import Link from 'next/link';
import CreateDocument from '../editor/CreateDocument';

const Sidebar = () => {
    const recentDocs = [
        { id:1, title: 'Document 1'},
        { id:2, title: 'Document 2'},
        { id:3, title: 'Document 3'},
        { id:4, title: 'Document 4'}
    ];
    return (
      <div className="w-64 bg-[#CAD2C5] flex flex-col border-r-4 border-[#52796F] py-4">
        <h2 className="text-[#354F52] text-2xl font-semibold mb-6 whitespace-nowrap px-4">
            Your Documents
        </h2>
        <ul className='grid grid-cols-[1fr]'>
          {recentDocs.map((doc) => (
            <li key={doc.id} className="text-[#2F3E46] text-md hover:text-white transition-colors duration-200 hover:bg-[#52796F] px-4 p-2 cursor-pointer">
              <Link
                href={`/editor/doc/${doc.id}`} // link to the document page
                className=""
              >
                <span className="mr-3">📄</span>
                {doc.title}
              </Link>
            </li>
          ))}
        </ul>
        <CreateDocument />
      </div>
  );
};

export default Sidebar;