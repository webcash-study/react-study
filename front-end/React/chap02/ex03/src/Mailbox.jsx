const MailBox = ({ unreadMessage }) => {
  return (
    <div>
      <h1>Hello</h1>
      {unreadMessage.length > 0 && (
        <p>{unreadMessage.length}개를 안 읽었습니다.</p>
      )}
    </div>
  );
};

export default MailBox;
