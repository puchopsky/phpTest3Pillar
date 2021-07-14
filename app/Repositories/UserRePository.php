<?php


namespace App\Repositories;


use App\Models\User;

class UserRePository
{

    /** @var User $userModel */
    protected User $userModel;

    /**
     * UserRePository constructor.
     *
     * @param User $userModel
     */
    public function __construct(User $userModel)
    {
        $this->userModel = $userModel;
    }

    /**
     * To search user by email
     *
     * @param string $email
     *
     * @return User
     */
    public function searchUserByEmail(string $email = ''): User
    {
        return $this->userModel::where('email', '=', $email)->first();
    }
}
