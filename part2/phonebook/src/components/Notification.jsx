function Notification({ notification }) {
    const { message, className } = notification;
    return message === null ? null : <div className={className}>{message}</div>;
}

export default Notification;