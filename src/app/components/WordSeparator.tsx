type WordSeparatorProps = {
  word?: string;
}

export default function WordSeparator(props: WordSeparatorProps) {
  return (
    <div className="flex flex-row items-center before:content-[''] before:flex-auto before:border-b-1 after:content-[''] after:flex-auto after:border-b-1">
      <span className="mx-4">{props.word}</span>
    </div>
  )
}