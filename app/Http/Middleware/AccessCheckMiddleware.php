<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Exceptions\PermissionDoesNotExist;
use Spatie\Permission\Exceptions\UnauthorizedException;

class AccessCheckMiddleware
{
    public function handle(Request $request, Closure $next, $guard = 'web')
    {
        if (app('auth')->guard($guard)->guest()) {
            throw UnauthorizedException::notLoggedIn();
        }

        /**
         * @var User $user
         */
        $user = app('auth')->guard($guard)->user();
        $permission = Route::currentRouteName();
        try {
            if (!$user->hasPermissionTo($permission, $guard)) {
                throw UnauthorizedException::forRolesOrPermissions([$permission]);
            }
        } catch (PermissionDoesNotExist) {
        }
        return $next($request);
    }
}
