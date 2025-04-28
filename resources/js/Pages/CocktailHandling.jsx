import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

export default function CocktailHandling({auth}) {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    fetchCocktails();
  }, []);

  const fetchCocktails = () => {
    axios.get('/cocktails') 
      .then(response => {
        setCocktails(response.data.drinks);
      })
      .catch(error => {
        console.error('Error fetching cocktails:', error);
      });
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this cocktail?')) {
      axios.delete(`/api/cocktails/${id}`)
        .then(() => {
          fetchCocktails(); // Vuelve a cargar la lista
        })
        .catch(error => {
          console.error('Error deleting cocktail:', error);
        });
    }
  };

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Instructions', selector: row => row.instructions },
    {
      name: 'Actions',
      cell: row => (
        <>
          <button
            onClick={() => handleEdit(row.id)}
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

  const handleEdit = (id) => {
    // Puedes redirigir o abrir un modal para editar
    console.log('Edit cocktail', id);
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
    </div>

    </AuthenticatedLayout>
  );
}