<?php

namespace Tests\Feature;

use Mockery;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Http\Controllers\DictionaryController;
use App\Repositories\Owlbot;


class DictionaryControllerTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {

        $stub = Mockery::mock(Owlbot::class);
        $stub->shouldReceive('search')->with('query')->andReturn(
            json_encode(array(
                "pronunciation" => "blud",
                "word" => "blood"
            ))
        );


        $session = new DictionaryController($stub);
        $result = $session->search('query');

        $this->assertSame($result->getStatusCode(), 200);
        $this->assertSame($result->getContent(), '"{\"pronunciation\":\"blud\",\"word\":\"blood\"}"');
    }
}
