<?php

namespace App\Repositories;

use App\Repositories\DictionaryAdapterInterface;
use App\Repositories\ApiInterface;

class DictionaryAdapter implements DictionaryAdapterInterface
{
    private $api;

    public function __construct($api)
    {
        $this->api = $api;
    }

    public function search($query)
    {
        return $this->api->search($query);
    }
}
