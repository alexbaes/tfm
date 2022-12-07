<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;


class Meeting extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'place', 'start_date', 'end_date', 'slug', 'user_id'];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
