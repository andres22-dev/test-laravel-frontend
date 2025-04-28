import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';


/*

  { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Category', selector: row => row.category },
    { name: 'Instructions', selector: row => row.instructions },
    { name: 'Image', selector: row => row.image },

 */
export default function CocktailHandling({auth}) {
  const [cocktails, setCocktails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCocktail, setCurrentCocktail] = useState({ id: null, name: '', category: '', instructions: '', image: ''});


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

  const handleEdit = (id) => {
    setCurrentCocktail(id);
    setShowModal(true);
  };
  const handleInputChange = (e) => {
    setCurrentCocktail({
        ...currentCocktail,
        [e.target.name]: e.target.value,
    });
};
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this cocktail?')) {
      axios.delete(`/api/cocktails/${id}`)
        .then(() => {
          fetchCocktails(); 
        })
        .catch(error => {
          console.error('Error deleting cocktail:', error);
        });
    }
  };

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Category', selector: row => row.category },
    { name: 'Instructions', selector: row => row.instructions },
    { name: 'Image', selector: row => row.image },

    
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



const handleUpdate = () => {
    axios.put(`/api/cocktails/${currentCocktail.id}`, currentCocktail)
        .then(() => {
            setShowModal(false);
            fetchCocktails();
        })
        .catch(error => {
            console.error('Error updating cocktail:', error);
        });
};

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Data Center Cocktails</h2>}
    >
      <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Cocktails</h1>
      <DataTable
        columns={columns}
        data={cocktails}
        pagination
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
                                name="instructions"
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