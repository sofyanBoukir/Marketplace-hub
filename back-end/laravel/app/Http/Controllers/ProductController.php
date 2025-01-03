<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Save;
use Exception;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class ProductController extends Controller
{
    public function getSavedProducts()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $savedProducts = Save::where("user_id",$user->id)
                                ->with("product")
                                ->paginate(10);

            return response()->json([
                'savedProducts' => $savedProducts,
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }
}
