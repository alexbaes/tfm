<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;


class MeetingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'títol' => Str::title($this->title),
            'descripció' => $this->description,
            'lloc' => $this->place,
            'data inici' => $this->start_date,
            'data_fi' => $this->end_date,
            'url' => $this->slug,
            'creat per' => $this->user_id
        ];
    }
}
