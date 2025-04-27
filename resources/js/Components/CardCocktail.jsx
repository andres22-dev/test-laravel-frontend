export default function CardCocktail({ title, description }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}