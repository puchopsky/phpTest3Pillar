<?php


namespace App\Repositories;


use App\Models\User;

class UserRePository
{

    protected User $userModel;

    public function __construct(User $userModel)
    {
        $this->userModel = $userModel;
    }

    public function searchUserByEmail(string $email = ''): User
    {
        return $this->userModel::where('id', '=', $tokenUserInfo->id)->first();
    }
}
