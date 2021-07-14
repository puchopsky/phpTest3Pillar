<?php

namespace App\Http\Controllers;

use App\Repositories\UserRePository;
use App\ResponseDecorators\LoginControllerDecorator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Class AuthController
 * @package App\Http\Controllers
 */
class LoginController extends Controller
{
    /** @var LoginControllerDecorator $responseDecorator */
    protected LoginControllerDecorator $responseDecorator;

    /** @var UserRePository $userRepository */
    protected UserRePository $userRepository;

    /**
     * AuthController constructor.
     * @param LoginControllerDecorator $responseDecorator
     * @param UserRePository $userRepository
     */
    public function __construct(LoginControllerDecorator $responseDecorator, UserRePository $userRepository)
    {
        $this->responseDecorator = $responseDecorator;
        $this->userRepository = $userRepository;
    }

    /**
     * To verify the user credentials and return a JWT token to use on the rest of the API
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function loginUser(Request $request): JsonResponse
    {
        $incommingData = [
            'email' => $request->get('email'),
            'password' => $request->get('password'),
        ];

        if (Auth::attempt($incommingData)) {
            $user = Auth::user();

            $token = $request->user()->createToken('apiToken')->plainTextToken;

            return response()->json($this->responseDecorator->decorateLoggedInUserResponse($user, $token));

        } else {
            return response()->json('Unauthorized', 401);
        }
    }

    /**
     * To remove the JWT tokens
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logoutUser(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json($this->responseDecorator->decorateLogOutResponse());
    }

    /**
     * To fetch the user info based on the JWT token
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getUserInfo(Request $request): JsonResponse
    {
        return response()->json($this->responseDecorator->decorateGetUserInfoResponse($request->user()));
    }
}
