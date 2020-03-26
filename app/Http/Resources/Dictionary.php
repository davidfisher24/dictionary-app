<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Dictionary extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */

    public function toArray($request)
    {
        return [
            'definitions' => $this->resource->definitions ?? [],
            'pronunciation' => $this->resource->pronunciation ?? NULL,
            'word' => $this->resource->word ?? NULL
        ];
    }
}
