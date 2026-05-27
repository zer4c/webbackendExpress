interface PanelProps {
  children: React.ReactNode
}

function Panel({ children }: PanelProps) {
  return (
    <section className="Panel">
      {children}
    </section>
  )
}

export default Panel