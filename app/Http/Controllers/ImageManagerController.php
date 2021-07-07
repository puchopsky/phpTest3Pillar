<?php

namespace App\Http\Controllers;

use App\ResponseDecorators\ImageManagerControllerDecorator;
use Illuminate\Http\Request;

class ImageManagerController extends Controller
{
    protected ImageManagerControllerDecorator $imageManagerControllerDecorator;

    public function __constructor(ImageManagerControllerDecorator $imageManagerControllerDecorator)
    {
        $this->imageManagerControllerDecorator = $imageManagerControllerDecorator;
    }

    public function uploadImages() {

    }
}
