
import { createSupabaseServerClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = await createSupabaseServerClient(cookieStore)

  const { data: todos } = await supabase.from('test').select()

  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  )
}
