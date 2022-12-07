<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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
            'description' => "Celebració de l'aniversari dels 50 anys",
            'place' => 'Restaurant Censals',
            'start_date' =>  Carbon::parse('2022-05-01'),
            'end_date' =>  Carbon::parse('2000-05-01'),
            'slug' => 'aniversari-50-anys',
            'user_id' => '1'
        ]);

        DB::table('meetings')->insert([
            'title' => 'Aniversari 2',
            'description' => "Celebració de l'aniversari dels 70 anys",
            'place' => 'Restaurant Ambigú',
            'start_date' =>  Carbon::parse('2022/10/05'),
            'end_date' =>  Carbon::parse('2022/12/05'),
            'slug' => 'aniversari-70-anys',
            'user_id' => '1'
        ]);

        DB::table('meetings')->insert([
            'title' => 'Aniversari 3',
            'description' => "Celebració de l'aniversari dels 90 anys",
            'place' => 'Restaurant Subirats',
            'start_date' =>  Carbon::parse('2022/10/30'),
            'end_date' =>  Carbon::parse('2022/12/30'),
            'slug' => 'aniversari-90-anys',
            'user_id' => '1'
        ]);
    }
}
