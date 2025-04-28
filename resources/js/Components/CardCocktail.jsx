import { useEffect, useState } from 'react';
export default function CardCocktail({ title, description, category, img }) {

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const saveCocktail = async () => {
          setIsSaving(true);
          setErrorMessage('');
  
          try {
              const response = await axios.post('/api/cocktails', {
                  name: title,  
                  category: description,
                  instructions: category,  
                  image: img,  
              });
  
              if (response.status === 201) {
                  alert('Cóctel guardado con éxito!');
              }
          } catch (error) {
              console.error('Error al guardar el cóctel:', error);
              setErrorMessage('Hubo un error al guardar el cóctel.');
          } finally {
              setIsSaving(false);
          }
      };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <h3>{category}</h3>
      <img src={img} alt="a" />
      <p className="text-gray-700">{description}</p>
    </div>
  );
}