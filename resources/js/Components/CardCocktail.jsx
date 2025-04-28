export default function CardCocktail({ title, description, category, img }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <h3>{category}</h3>
      <img src={img} alt="a" />
      <p className="text-gray-700">{description}</p>
    </div>
  );
}