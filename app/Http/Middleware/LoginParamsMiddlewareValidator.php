<?php

namespace App\Http\Middleware;

use App\AbstractClasses\MiddleWareValidator;
use Closure;
use Illuminate\Http\Request;
use App\Validation\RuleValidationSelector;
use Illuminate\Support\Facades\Log;
use App\ResponseDecorators\LoginControllerDecorator;

class LoginParamsMiddlewareValidator extends MiddleWareValidator
{

    public function __construct(
        RuleValidationSelector $ruleValidationSelector,
        LoginControllerDecorator $decorator)
    {
        parent::__construct($ruleValidationSelector, $decorator);
    }


    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next): mixed
    {
        $this->request = $request;
        Log::debug('____________MIDDLE WARE LOGIN INCOMMING ');
        Log::info(json_encode($request->all()));
        Log::debug('Reqquest Method ' . $request->method());
        $this->verifyHttpRequestVerb();
        if ($this->isAllowedToProceed) {
            $this->validateIncomingRequestValues();

            if ($this->ruleValidationSelector->fails()) {
                Log::debug('We have Validation Error ' . $this->ruleValidationSelector->messages()->first());
                return response()->json($this->generateDecoratoredResponse());
            }
        }

        return $next($request);
    }
}
