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
        setCocktails(response.data.drinks); // guardas la lista de cocktails
        
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
                        <div className="p-6 text-gray-900">
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                            {cocktails.map(cocktail => (
                            <Card
                                key={cocktail.idDrink}
                                title={cocktail.strDrink}
                                category={cocktail.strCategory}
                                description={cocktail.strInstructions}
                                img={cocktail.strDrinkThumb}
                            />
                            ))}
                            </div>  
                        </div>
                        
                    </div>
                </div>
            </div>
        
        
        </AuthenticatedLayout>
    );
}
