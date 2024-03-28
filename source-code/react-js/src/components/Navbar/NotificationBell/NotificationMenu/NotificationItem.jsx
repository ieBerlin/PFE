export default function NotificationItem({ title, description, duration }) {
  return (
    <div className="notification-item">
      <div className="notification-item-info">
        <div className="title">
          <p>{title}</p>
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
      </div>
      <span className="duration">{duration}</span>
    </div>
  );
}
