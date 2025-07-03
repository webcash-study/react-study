const Destination = ({ place = "서울", description = "남산타워와..." }) => {
  return (
    <div>
      <h2>{place}</h2>
      <h2>{description}</h2>
    </div>
  );
};

export default Destination;
