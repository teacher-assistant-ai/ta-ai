import Link from 'next/link';
import {createSupabaseServerClient} from '../../utils/supabase/server';

const Sidebar = async () => {
  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("Supabase KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    const recentDocs = [
        { id:1, title: 'Document 1'},
        { id:2, title: 'Document 2'},
        { id:3, title: 'Document 3'},
        { id:4, title: 'Document 4'}
    ];
    const supabase  = await createSupabaseServerClient();

    const { data: materials, error } = await supabase
      .from('materials')
      .select('id, title');
    
    if(error) {
      console.error("error fetching docs:", error.message);
      return <div className='p-4 text-red-500'>Failed to load document</div>
    }
    return (
      <div className="w-64 h-screen bg-[#CAD2C5] p-5 flex flex-col border-r-4 border-[#52796F]">
        <h2 className="text-[#354F52] text-2xl font-semibold mb-6 whitespace-nowrap">
            Recent Documents
        </h2>
        <ul>
          {materials?.map((material) => (
            <li key={material.id} className="mb-6">
              <Link
              href={`/document/${material.id}`} // link to the document page
              className="text-[#2F3E46] text-lg hover:text-[#84A98C] transition-colors duration-200"
              >
                <span className="mr-3">📄</span>
                {material.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
  );
};

export default Sidebar;