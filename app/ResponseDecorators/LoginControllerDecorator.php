<?php


namespace App\ResponseDecorators;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;

/**
 * Class LoginControllerDecorator
 * @package App\Decorators
 */
class LoginControllerDecorator extends GenericResponsesDecorator
{

    /**
     * @param Authenticatable|null $user
     * @param string $token
     *
     * @return array
     */
    public function decorateLoggedInUserResponse(Authenticatable $user = null, string $token = ''): array
    {
        $responseArray = [];

        if (!empty($user)) {
            $responseArray = [
                'success' => true,
                'foundUserInfo' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,

                ],
                'token_type' => 'Bearer',
                'token' => $token
            ];
        }
        return $responseArray;
    }

    /**
     * @param Authenticatable|null $user
     * @param string $token
     *
     * @return array
     */
    public function decorateGetUserInfoResponse(Authenticatable $user = null): array
    {
        $responseArray = [];

        if (!empty($user)) {
            $responseArray = [
                'success' => true,
                'foundUserInfo' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,

                ],
            ];
        }
        return $responseArray;
    }

    public function decorateLogOutResponse(): array
    {
        return [
            'success' => true,
            'message' => 'Successfully logged out',
        ];
    }
}
