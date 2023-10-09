<?php

namespace App\Http\Controllers;

use App\Http\Requests\DashboardAddRequest;
use App\Services\DashboardService;

class DashboardController extends Controller
{
    /**
     * @param DashboardAddRequest $request
     * @param DashboardService $dashboardService
     * @return Response|ResponseFactory|RedirectResponse
     * @throws Exception
     */
    public function index(DashboardAddRequest $request, DashboardService $dashboardService)
    {
        if ($request->isMethod("post")) {
            $dashboardService->save($request);
            return redirect()->back();
        }
        return inertia("Dashboard", [
            "data" => $dashboardService->getAll()
        ]);
    }
}
