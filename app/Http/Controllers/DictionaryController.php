<?php

namespace App\Http\Controllers;

use App\Repositories\DictionaryAdapter;
use App\Repositories\Owlbot;

class DictionaryController extends Controller
{
    private $api;

    public function __construct()
    {
        $this->api = new Owlbot();
    }

    public function search ($query)
    {
        $api = new DictionaryAdapter($this->api);
        $data = $api->search($query);
        return response()->json($data, 200);
    }
}
