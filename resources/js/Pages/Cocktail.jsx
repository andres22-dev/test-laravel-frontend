import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Card from '@/Components/CardCocktail';

export default function Cocktail({ auth }) {

const [cocktails, setCocktails] = useState([]);

useEffect(() => {
    axios.get('/cocktails')
    .then(response => {
        console.log(response)
        setCocktails(response.data); // guardas la lista de cocktails
        
    })
    .catch(error => {
        console.error('Error fetching cocktails:', error);
    });
    }, []);
    
    

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">List Cocktails</h2>}
        >
            <Head title="Cocktail" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">I'm first code in laravel
                        
                        </div>
                        
                    </div>
                </div>
            </div>
        
        
        </AuthenticatedLayout>
    );
}
