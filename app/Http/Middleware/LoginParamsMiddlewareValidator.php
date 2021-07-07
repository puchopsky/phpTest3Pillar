<?php

namespace App\Http\Middleware;

use App\Classes\MiddleWareValidator;
use Closure;
use Illuminate\Http\Request;
use App\Validation\RuleValidationSelector;
use Illuminate\Support\Facades\Log;
use App\ResponseDecorators\LoginControllerDecorator;
use JetBrains\PhpStorm\Pure;

class LoginParamsMiddlewareValidator extends MiddleWareValidator
{
    /**
     * LoginParamsMiddlewareValidator constructor.
     *
     * @param RuleValidationSelector $ruleValidationSelector
     * @param LoginControllerDecorator $decorator
     */
    public function __construct(
        RuleValidationSelector $ruleValidationSelector,
        LoginControllerDecorator $decorator)
    {
        parent::__construct($ruleValidationSelector, $decorator);
    }
}
