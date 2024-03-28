export default function SidebarListItem({label,imgSrc}) {
  return (
    <li>
      <a href="">
        <div className="img-container">
          <img src={imgSrc} alt="" />
        </div>
        <span className="links_name">label</span>
      </a>
    </li>
  );
}
