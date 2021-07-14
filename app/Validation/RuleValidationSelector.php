<?php

namespace App\Validation;

use App\Validation\Rules\ValidationRulesConstants;

class RuleValidationSelector
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @param string $rulesToValidate
     * @param string $from
     *
     * @return array
     */
    public function getRules(string $rulesToValidate = 'new', string $from = 'login'): array
    {
        $rules = $this->getConstantRules($from);
        return $rules[$rulesToValidate];
    }

    /**
     * To get the rules based on the incoming from parameter
     *
     * @param string $from
     * @return array
     */
    protected function getConstantRules(string $from) : array
    {
        $constant = [];

        switch ($from) {
            case 'login':
                $constant = ValidationRulesConstants::LOGIN_PARAMS_RULES;
                break;
            case 'uploadImages':
                $constant = ValidationRulesConstants::IMAGE_MANAGER_RULES;
                break;
        }

        return $constant;
    }

}
