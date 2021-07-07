<?php


namespace App\ResponseDecorators;

use App\Models\User;

/**
 * Class LoginControllerDecorator
 * @package App\Decorators
 */
class LoginControllerDecorator extends GenericResponsesDecorator
{

    /**
     * @param User|null $user
     *
     * @return array
     */
    public function decorateLoggedInUserResponse(User $user = null): array
    {
        return [
            'success' => true,
            'foundUserInfo' => [
                'name' => 'Rufus',
                'email' => 'Titus@Email.com',
            ],
            'token_type' => 'Bearer',
            'token' => 'AC1234'
        ];
    }
}
