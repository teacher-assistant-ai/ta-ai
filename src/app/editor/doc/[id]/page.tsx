import { createSupabaseServerClient } from "@/utils/supabase/server";
import GeneratedQuestion from "./GeneratedQuestion";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log("I am beiiingngdkd renddfalkjdflk;ajsdf", id);

  const supabase = await createSupabaseServerClient();
  const { data: document, error: documentError } = await supabase
    .from("document")
    .select()
    .eq("id", id)
    .single();

  if (documentError) {
    console.error("Error fetching document:", documentError.message);
    return <div className="p-4 text-red-500">Failed to load document</div>;
  } else {
    console.log("Document:", document);
  }

  const { data: questions, error: questionError } = await supabase
    .from("document_questions")
    .select()
    .eq("document_id", document.id);

  if (questionError) {
    console.error("Error fetching questions:", questionError.message);
    return <div className="p-4 text-red-500">Failed to load questions</div>;
  } else {
    console.log("Questions:", questions);
  }

  return (
    <div className="w-full h-full overflow-scroll py-8 px-16">
      <h1 className="text-2xl font-bold mb-4 text-center">{document.title}</h1>
      <div className="flex flex-col items-center gap-8">
        {questions.map((question) => 
          <GeneratedQuestion 
            key={question.id}
            question={question.question}
            answer={question.answer}
            howTo={question.how_to}
          />
        )}
      </div>
    </div>
  );
}
