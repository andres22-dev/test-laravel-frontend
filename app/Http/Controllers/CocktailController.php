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

    public function update(Request $request, $id)
{
    $cocktail = Cocktail::findOrFail($id);

    $cocktail->update($request->only('name', 'category', 'instructions', 'image'));

    return response()->json(['message' => 'Cocktail updated successfully']);
}
}