<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware as ControllersMiddleware;
use Illuminate\Support\Facades\Gate;
use Nette\Schema\Expect;
use PHPUnit\Framework\MockObject\Stub\ReturnReference;

class PostController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new ControllersMiddleware('auth:sanctum', except: ['index', 'show'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Post::with('user')->latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'title' => 'required | max:250',
            'body' => 'required',
        ]);

        $post = $request->user()->posts()->create($validate);
        return  ["post" => $post, "user" => $post->user];
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return  ["post" => $post, "user" => $post->user];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        Gate::authorize('modify', $post);
        $validate = $request->validate([
            'title' => 'required | max:250',
            'body' => 'required',
        ]);
        $post->update($validate);
        return  ["post" => $post, "user" => $post->user];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        Gate::authorize('modify', $post);
        $post->delete();
        return ['Message' => 'the post was deleted'];
    }
}
