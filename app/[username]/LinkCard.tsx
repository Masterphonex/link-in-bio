type LinkCardProps = {
  title: string
  url: string
}

export default function LinkCard({ title, url }: LinkCardProps) {
  return (

    <a
      href={url}
      target="_blank"
      className="group flex items-center justify-between bg-surface border border-white/5 rounded-2xl px-5 py-4 transition-all hover:border-accent/40 hover:bg-surface/80"
    >
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-muted text-sm">{url}</p>
      </div>
      <span className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all">
        →
      </span>
    </a >
  )
}
