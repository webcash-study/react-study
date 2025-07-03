import Fruits from "./Fruits";
import Item from "./Item";
import MailBox from "./Mailbox";

function App() {
  const fruits = ["Apple"];
  return (
    <div>
      <Item isDone={true} />
      <Item isDone={false} />
      <MailBox unreadMessage={["hi"]} />
      {/* 안티패턴 수정: Fruits 컴포넌트가 표시되는지 알 수 있어야 함 */}
      {fruits.length > 0 && <Fruits fruits={fruits} />}
      <Fruits fruits={[]} />
    </div>
  );
}

export default App;
