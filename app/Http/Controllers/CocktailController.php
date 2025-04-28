<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CocktailController extends Controller
{
    public function getByIngredient($ingredient)
    {
        try {
            $response = Http::get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i={$ingredient}");
            $data = $response->json();

            return response()->json($data);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch cocktails'], 500);
        }
    }
}