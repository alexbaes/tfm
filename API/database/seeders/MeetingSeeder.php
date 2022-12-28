<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Meeting;

class MeetingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('meetings')->insert([
            'title' => 'Aniversari',
            'place' => 'Restaurant Censals',
            'start_date' =>  Carbon::parse('2022-05-01'),
            'end_date' =>  Carbon::parse('2000-05-01'),
            'slug' => 'aniversari-50-anys',
            'user_id' => '1'
        ]);

        DB::table('meetings')->insert([
            'title' => 'Aniversari 2',
            'place' => 'Restaurant Ambigú',
            'start_date' =>  Carbon::parse('2022/10/05'),
            'end_date' =>  Carbon::parse('2022/12/05'),
            'slug' => 'aniversari-70-anys',
            'user_id' => '1'
        ]);

        DB::table('meetings')->insert([
            'title' => 'Aniversari 3',
            'place' => 'Restaurant Subirats',
            'start_date' =>  Carbon::parse('2022/10/30'),
            'end_date' =>  Carbon::parse('2022/12/30'),
            'slug' => 'aniversari-90-anys',
            'user_id' => '1'
        ]);

        $meetings = Meeting::all();

        foreach ($meetings as $meeting) {
            $meeting->users()->attach([rand(1, 2)]);
        }
    }
}
