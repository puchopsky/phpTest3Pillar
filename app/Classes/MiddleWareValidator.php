<?php

namespace App\Classes;

use App\Interfaces\ResponseDecoratorInterface;
use App\Validation\RuleValidationSelector;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Closure;
use \Illuminate\Contracts\Validation\Validator as ValidatorObject;

class MiddleWareValidator
{

    /** @var string $comesFrom */
    protected string $comesFrom = 'login';

    /** @var ResponseDecoratorInterface $decorator */
    protected ResponseDecoratorInterface $decorator;

    /** @var string $operationToValidate */
    protected string $operationToValidate = '';

    /** @var bool $isAllowedToProceed */
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
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next): mixed {
        $this->request = $request;

        $this->verifyHttpRequestVerb();
        if ($this->isAllowedToProceed) {
            $this->validateIncomingRequestValues();

            if ($this->ruleValidationSelector->fails()) {
                return response()->json($this->generateDecoratedResponse());
            }
        }

        return $next($request);
    }

    /**
     * To indicate which rule operation to use based on the request method
     */
    public function verifyHttpRequestVerb()
    {
        switch ($this->request->method()) {
            case 'GET':
                $this->operationToValidate = 'get';
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

    /**
     * To retrieve the correct rules based on the operation and validate the incoming parameters against those rules
     */
    public function validateIncomingRequestValues()
    {
        $foundRules = $this->ruleValidationSelector->getRules($this->operationToValidate, $this->comesFrom);
        $this->ruleValidationSelector = Validator::make(
            $this->request->all(),
            $foundRules
        );
    }

    public function generateDecoratedResponse(): array
    {
        return $this->decorator->decorateErrorValidationResponse($this->ruleValidationSelector->messages()->first());
    }

}
