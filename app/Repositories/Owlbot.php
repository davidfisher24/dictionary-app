<?php

namespace App\Repositories;

use Config;
use GuzzleHttp;
use App\Http\Resources\Dictionary;

class Owlbot {

    public function search($query) {
        $client = new GuzzleHttp\Client();
        $headers = [
                'Authorization' => 'Token ' . Config::get('services.owlbot.api_token'),
                'Accept'        => 'application/json',
            ];
        $res = $client->get(
            "https://owlbot.info/api/v4/dictionary/$query",
            [
                'headers' => $headers,
                'http_errors' => false
            ]
        );

        $statuscode = $res->getStatusCode();

        if (200 === $statuscode) {
            $data = json_decode($res->getBody());
            return Dictionary::make($data)->resolve();
        }
        else if (401 === $statuscode) {
            throw new MyException("Api key invalid or not provided");
        }
        elseif (404 === $statuscode) {
            $data = (object) array(
                'definitions' => [],
                'word' => $query
            );
            return Dictionary::make($data)->resolve();
        }
        else {
          throw new MyException("Invalid response from api");
        }


    }
}
