<?php

namespace App\Http\Middleware;

use App\Classes\MiddleWareValidator;
use App\Validation\RuleValidationSelector;
use App\ResponseDecorators\LoginControllerDecorator;

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
