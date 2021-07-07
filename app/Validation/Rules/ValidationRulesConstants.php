<?php

namespace App\Validation\Rules;

class ValidationRulesConstants
{

    public const  LOGIN_PARAMS_RULES = [
        'new' => [
            'email' => 'required',
            'password' => 'required',
        ],
        'delete'=> [],
        'get'=> [],
    ];


}
