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

public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'instructions' => 'required|string',
            'image' => 'nullable|string',
        ]);

        $cocktail = Cocktail::create($validated);

        return response()->json([
            'message' => 'Cóctel creado correctamente',
            'cocktail' => $cocktail,
        ], 201);
    }
}