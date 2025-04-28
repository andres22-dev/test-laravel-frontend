<?php
namespace App\Http\Controllers;

use App\Models\Cocktail;
use Illuminate\Http\Request;

class CocktailController extends Controller
{
    public function index()
    {
        return Cocktail::all();
    }

    public function destroy($id)
    {
        $cocktail = Cocktail::findOrFail($id);
        $cocktail->delete();

        return response()->json(['message' => 'Cocktail deleted successfully']);
    }
}