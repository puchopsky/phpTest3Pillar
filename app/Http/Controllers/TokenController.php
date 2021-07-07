<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TokenController extends Controller
{

    public function createTokenOnLogin(Request $request) {
        $token = $request->user()->createToken($request->token_name);
        echo'We have token';
        var_dump($token);

        return ['token' => $token->plainTextToken];
    }
}
