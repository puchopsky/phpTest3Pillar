<?php

namespace App\Http\Controllers;

use App\Repositories\UserRePository;
use App\ResponseDecorators\LoginControllerDecorator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
     */
    public function __construct(LoginControllerDecorator $responseDecorator, UserRePository $userRepository)
    {
        $this->responseDecorator = $responseDecorator;
        $this->userRepository = $userRepository;
    }

    /**
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

        Log::debug('____________LOGIN INCOMMING VALUES ');
        Log::debug(json_encode($incommingData));

        if (Auth::attempt($incommingData)) {
            $user = Auth::user();

            Log::debug('____________User is allowed ');
            Log::debug(json_encode($user));

            Log::debug('____________Request ');

            $token = $request->user()->createToken('apiToken')->plainTextToken;

            Log::debug('____________Generated Token  ');
            Log::debug(json_encode($token));

            return response()->json($this->responseDecorator->decorateLoggedInUserResponse($user, $token));

        } else {
            return response()->json('Unauthorized', 401);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logoutUser(Request $request)
    {
        Log::debug('User Log Out Request  ');
        $request->user()->currentAccessToken()->delete();
        return response()->json($this->responseDecorator->decorateLogOutResponse());
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserInfo(Request $request)
    {
        $incomingUser = $request->user();

        Log::debug('User Info is  ');
        Log::debug(json_encode($incomingUser));

        return response()->json($this->responseDecorator->decorateGetUserInfoResponse($incomingUser));
    }
}
