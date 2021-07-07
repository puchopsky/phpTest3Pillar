<?php

namespace App\Http\Middleware;

use App\Classes\MiddleWareValidator;
use App\Validation\RuleValidationSelector;
use App\ResponseDecorators\ImageManagerControllerDecorator;


class ImageMangerParamsMiddlewareValidator extends MiddleWareValidator
{
    /**
     * ImageMangerParamsMiddlewareValidator constructor.
     *
     * @param RuleValidationSelector $ruleValidationSelector
     * @param ImageManagerControllerDecorator $decorator
     */
    public function __construct(
        RuleValidationSelector $ruleValidationSelector,
        ImageManagerControllerDecorator $decorator)
    {
        parent::__construct($ruleValidationSelector, $decorator);
    }
}
