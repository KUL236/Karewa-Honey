export default function Section({ id, tone = '', eyebrow, title, lead, children, wide, bg }) {
  return (
    <section id={id} className={'sec ' + tone + (bg ? ' has-bg' : '')}>
      {bg}
      <div className={'wrap' + (wide ? ' wide' : '')}>
        {(eyebrow || title) && <header className="sec-h rv">{eyebrow && <span className="eyebrow">{eyebrow}</span>}{title && <h2>{title}</h2>}{lead && <p className="lead">{lead}</p>}</header>}
        {children}
      </div>
    </section>
  );
}
