import Link from 'next/link';

const Sidebar = () => {
    const recentDocs = [
        { id:1, title: 'Document 1'},
        { id:2, title: 'Document 2'},
        { id:3, title: 'Document 3'},
        { id:4, title: 'Document 4'}
    ];
    return (
      <div className="w-64 h-screen bg-[#CAD2C5] p-5 flex flex-col border-r-4 border-[#52796F]">
        <h2 className="text-[#354F52] text-2xl font-semibold mb-6 whitespace-nowrap">
            Recent Documents
        </h2>
        <ul>
          {recentDocs.map((doc) => (
            <li key={doc.id} className="mb-6">
              <Link
              href={`/document/${doc.id}`} // link to the document page
              className="text-[#2F3E46] text-lg hover:text-[#84A98C] transition-colors duration-200"
              >
                <span className="mr-3">📄</span>
                {doc.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
  );
};

export default Sidebar;