import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function CocktailHandling({auth}) {
  const [cocktails, setCocktails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCocktail, setCurrentCocktail] = useState({ id: null, name: '', category: '', instructions: '', image: ''});

  const customStyles = {
    table: {
      style: {
        minWidth: '1000px', 
      },
    },
    tableWrapper: {
      style: {
        overflowX: 'auto', 
      },
    },
  };

  useEffect(() => {
    fetchCocktails();
  }, []);

  const fetchCocktails = () => {
    axios.get('/api/cocktails') 
      .then(response => {
        setCocktails(response.data);
      })
      .catch(error => {
        console.error('Error fetching cocktails:', error);
      });
  };

  const handleEdit = (cocktail) => {
    setCurrentCocktail(cocktail);
    setShowModal(true);
  };
  const handleInputChange = (e) => {
    setCurrentCocktail({
        ...currentCocktail,
        [e.target.name]: e.target.value,
    });
};

const showQuestionAlert = (id) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres eliminar este cóctel?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, Eliminar',
    cancelButtonText: 'No, No lo Elimines del Menu',
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`/api/cocktails/${id}`)
        .then(() => {
          fetchCocktails();
          Swal.fire({
            title: '¡Éxito!',
            text: 'El cóctel se ha editado correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        })
        .catch(error => {
          Swal.fire({
            title: '¡Error!',
            text: 'Hubo un problema al guardar el cóctel.',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo',
          });
        });
    } else {
      console.log('El cóctel no se guardó');
    }
  });
};
  const handleDelete = (id) => {
    if (showQuestionAlert(id)) {

    }
  };

  const handleUpdate = () => {
    axios.put(`/api/cocktails/${currentCocktail.id}`, currentCocktail)
        .then(() => {
            setShowModal(false);
            fetchCocktails();
            Swal.fire({
              title: '¡Éxito!',
              text: 'El cóctel se ha editado correctamente.',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
        })
        .catch(error => {
            Swal.fire({
              title: '¡Error!',
              text: 'Hubo un problema al guardar el cóctel.',
              icon: 'error',
              confirmButtonText: 'Intentar de nuevo',
            });
        });
};

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true, wrap:true,  width: '400px'},
    { name: 'Category', selector: row => row.category, wrap:true,  width: '400px'},
    { name: 'Instructions', selector: row => row.instructions, wrap:true, width: '500px' },
    { name: 'Image', selector: row => row.image, wrap:true,  width: '400px'},

    
    {
      name: 'Actions',
      cell: row => (
        <>
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-500 mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </>
      )
    }
  ];





  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Data Center Cocktails</h2>}
    >
      <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">Manage Cocktails</h1>
    
        <DataTable
        
        columns={columns}
        data={cocktails}
        pagination
        customStyles={customStyles} 
        />
    
      
      {/* Modal */}
      {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Edit Cocktail</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={currentCocktail.name}
                                onChange={handleInputChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Category:</label>
                            <input
                                name="category"
                                value={currentCocktail.category}
                                onChange={handleInputChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Instructions:</label>
                            <textarea
                                name="instructions"
                                value={currentCocktail.instructions}
                                onChange={handleInputChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Image:</label>
                            <input
                                name="instructions"
                                value={currentCocktail.image}
                                onChange={handleInputChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="mr-2 px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
    </div>

    </AuthenticatedLayout>
  );
}