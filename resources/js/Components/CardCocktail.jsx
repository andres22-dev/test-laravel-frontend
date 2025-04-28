import { useState } from 'react';


export default function CardCocktail({ title, description, category, img }) {

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const saveCocktail = async () => {
          setIsSaving(true);
          setErrorMessage('');
  
          try {
              const response = await axios.post('/api/cocktails', {
                  name: title,  
                  category: category,
                  instructions: description,  
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm mx-auto">
      <img src={img} alt={title} className="w-full h-48 object-cover"/>
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <h3>{category}</h3>

      <p className="text-gray-600 mb-4 h-24 overflow-y-auto">
        {description}
      </p>
      <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out focus:outline-none" onClick={saveCocktail} disabled={isSaving} >
                {isSaving ? 'Guardando...' : 'Guardar cóctel'}
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
      
    
    </div>
  );
}