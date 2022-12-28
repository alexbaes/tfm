<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Alex Barbera',
            'email' => 'alex@gmail.com',
            'password' => bcrypt('123456'),
            'status' => 1,
            'attendee' => true
        ]);

        User::create([
            'name' => 'Eric Barbera',
            'email' => 'eric@gmail.com',
            'password' => bcrypt('123456'),
            'status' => 1,
            'attendee' => true
        ]);

        $this->call([
            MeetingSeeder::class,
        ]);
    }
}
