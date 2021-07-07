<?php

namespace App\AbstractClasses;

use App\Interfaces\ResponseDecoratorInterface;
use App\Validation\RuleValidationSelector;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Closure;
use Illuminate\Support\Facades\Log;
use \Illuminate\Contracts\Validation\Validator as ValidatorObject;

abstract class MiddleWareValidator
{

    /**
     * @var ResponseDecoratorInterface $decorator
     */
    protected ResponseDecoratorInterface $decorator;

    /**
     * @var string $operationToValidate
     */
    protected string $operationToValidate = '';

    /**
     * @var bool $isAllowedToProceed
     */
    protected bool $isAllowedToProceed = true;

    /**
     * @var RuleValidationSelector|ValidatorObject $ruleValidationSelector
     */
    protected RuleValidationSelector|ValidatorObject $ruleValidationSelector;
    /**
     * @var Request
     */
    protected Request $request;

    /**
     * MiddleWareValidator constructor.
     * @param RuleValidationSelector|ValidatorObject $ruleValidationSelector
     * @param ResponseDecoratorInterface $decorator
     */
    public function __construct(RuleValidationSelector|ValidatorObject $ruleValidationSelector, ResponseDecoratorInterface $decorator)
    {
        $this->ruleValidationSelector = $ruleValidationSelector;
        $this->decorator = $decorator;
    }

    /**
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public abstract function handle(Request $request, Closure $next): mixed;

    public function verifyHttpRequestVerb()
    {
        switch ($this->request->method()) {
            case 'GET':
                $this->operationToValidate = 'get';
                $this->isAllowedToProceed = false;
                break;
            case 'POST':
                $this->operationToValidate = 'new';
                break;
            case 'PUT':
                $this->operationToValidate = 'edit';
                break;
            case 'DELETE':
                $this->operationToValidate = 'delete';
                break;
        }
    }

    public function validateIncomingRequestValues()
    {
        Log::debug("_____________ OPERTION TO VALIDATE {$this->operationToValidate}");
        $foundRules = $this->ruleValidationSelector->getRules($this->operationToValidate, 'login');
        $this->ruleValidationSelector = Validator::make(
            $this->request->all(),
            $foundRules
        );
    }

    public function generateDecoratoredResponse() :array
    {
        return $this->decorator->decorateErrorValidationResponse($this->ruleValidationSelector->messages()->first());
    }

}
