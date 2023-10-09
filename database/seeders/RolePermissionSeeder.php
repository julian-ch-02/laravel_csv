<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    public function run()
    {

        $guard = config('auth.defaults.guard');
        // create roles
        $superAdminRole = Role::findOrCreate(config('auth.role.superadmin'), $guard);

        $permission = collect([
        ]);

        $arrPermission = $permission->map(function ($item, $key) {
            return $item->name;
        });
        $superAdminRole->syncPermissions($arrPermission);


        // Reset cached roles and permissions
        app()->make(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
