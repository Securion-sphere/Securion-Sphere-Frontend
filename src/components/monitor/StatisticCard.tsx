interface CardProps {
  topic: string;
  score: number;
  color: string; // Expected to be a valid CSS color
  imagePath: string; // Local image path for the background image
}

const StatisticCard: React.FC<CardProps> = ({
  topic,
  score,
  color,
  imagePath,
}) => {
  return (
    <div
      className="bg-white shadow-md rounded-full p-4 text-center"
      style={{
        backgroundImage: `url(${imagePath})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h3 className="text-6xl font-bold shadow-xl" style={{ color }}>
        {score}
      </h3>
      <p className="text-gray-100 shadow-xl">{topic}</p>
    </div>
  );
};

export default StatisticCard;
