<?php

namespace App\Http\Controllers;

use App\ResponseDecorators\LoginControllerDecorator;
use App\Models\User;
use Carbon\Carbon;
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

    /**
     * AuthController constructor.
     * @param LoginControllerDecorator $responseDecorator
     */
    public function __construct(LoginControllerDecorator $responseDecorator)
    {
        $this->responseDecorator = $responseDecorator;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function loginUser(Request $request): JsonResponse
    {
        /* $rules = [
            'email' => 'required|exists:users',
            'password' => 'required'
        ];

        $request->validate($rules); */

        $incommingData = [
            'email' => $request->get('email'),
            'password' => $request->get('password'),
            'status' => 'ACTIVO'
        ];

        Log::debug('____________LOGIN INCOMMING VALUES ');
        Log::debug(json_encode($incommingData));
        return response()->json($this->responseDecorator->decorateLoggedInUserResponse());
        /*if (Auth::attempt($incommingData)) {
            $user = Auth::user();

            $tokenResult = $user->createToken(config('APP_NAME'));
            $tokenResult->token->expires_at = Carbon::now()->addMinute(180);
            $tokenResult->token->save();

            return response()->json($this->authDecorator->decorateLoggedInUserResponse($user, $tokenResult));

        } else {
            return response()->json('Unauthorized', 401);
        }*/
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logoutUser(Request $request)
    {
        $request->user()->token()->revoke();

        return response()->json([
            'success' => true,
            'message' => __('auth.logout_success')
        ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserInfo(Request $request)
    {
        $tokenUserInfo = $request->user();

        $user = User::where('id', '=', $tokenUserInfo->id)->first();

        return response()->json($this->responseDecorator->decorateGetUserInfo($user));
    }
}
