<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        $superadmin = User::firstOrCreate([
            'username' => 'superadmin'
        ], [
            'name' => 'Superadmin',
            'password' => Hash::make('admin2121')
        ]);

        if (!$superadmin->hasRole(config('auth.role.superadmin'))){
            $superadmin->assignRole(config('auth.role.superadmin'));
        }
    }
}
