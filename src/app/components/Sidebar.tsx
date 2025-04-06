import Link from 'next/link';

const Sidebar = () => {
    const recentDocs = [
        { id:1, title: 'Document 1'},
        { id:2, title: 'Document 2'},
        { id:3, title: 'Document 3'},
        { id:4, title: 'Document 4'}
    ];
    return (
        <div className="w-64 bg-blue-50 h-screen p-5 flex flex-col">
          <h2 className="text-2xl font-semibold mb-6">Recent Documents</h2>
          <ul>
            {recentDocs.map((doc) => (
              <li key={doc.id} className="mb-30">
                <Link
                  href={`/document/${doc.id}`} // link to the document page
                  className="text-blue-600 hover:underline"
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
};

export default Sidebar;