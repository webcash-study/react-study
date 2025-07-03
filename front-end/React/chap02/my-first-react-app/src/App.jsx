import Container from "./Container";
import Destination from "./Destination";

const App = () => {
  const destination = [
    {
      place: "파리",
      description: "에펠탑과 카페가 있는 도시",
    },
  ];

  return (
    <div>
      <Container>여행 지역</Container>
      <Destination place="파리" description="에펠탑과 카페가 있는 도시" />
      <Destination {...destination[0]} />
      <Destination />
    </div>
  );
};

export default App;
