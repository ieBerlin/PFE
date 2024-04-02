export default function FooterContentItem({ title, links,classes }) {
  return (
    <li>
      <a href="">
        <h2>{title}</h2>
      </a>
      <ul className={classes}>
        {links &&
          links.map((link, index) => (
            <li key={link + index}>
              <a href="">{link.title}</a>
            </li>
          ))}
      </ul>
    </li>
  );
}
