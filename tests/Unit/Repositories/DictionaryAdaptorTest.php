<?php

namespace Tests\Unit\Repositories;

use Mockery;
use PHPUnit\Framework\TestCase;
use App\Repositories\DictionaryAdapter;
use App\Repositories\Owlbot;

class DictionaryAdapterTest extends TestCase
{
    public function testSearchMethod()
    {
        $stub = Mockery::mock(Owlbot::class);
        $stub->shouldReceive('search')->with('query')->andReturn(
            json_encode(array(
                "pronunciation" => "blud",
                "word" => "blood"
            ))
        );

        $test = new DictionaryAdapter($stub);
        $result = $test->search('query');

        $this->assertSame($result, '{"pronunciation":"blud","word":"blood"}');
    }
}
