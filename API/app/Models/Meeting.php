<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;


class Meeting extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'place', 'start_date', 'end_date', 'slug', 'user_id'];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
