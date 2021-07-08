<?php

namespace App\Validation\Rules;

class ValidationRulesConstants
{

    public const  LOGIN_PARAMS_RULES = [
        'new' => [
            'email' => 'required',
            'password' => 'required',
        ],
        'delete' => [],
        'get' => [],
    ];

    public const IMAGE_MANAGER_RULES = [
        'get' => [],
        'new' => [
            'imagesToUpload' => 'required'
        ],
    ];


}
