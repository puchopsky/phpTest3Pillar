<?php

namespace App\Http\Controllers;

use App\ResponseDecorators\ImageManagerControllerDecorator;
use App\Services\RxFloDevImageUploader;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ImageManagerController extends Controller
{

    /** @var RxFloDevImageUploader $imageUploaderHandler */
    protected RxFloDevImageUploader $imageUploaderHandler;

    /** @var ImageManagerControllerDecorator $responseDecorator */
    protected ImageManagerControllerDecorator $responseDecorator;

    public function __construct(ImageManagerControllerDecorator $imageManagerControllerDecorator,
                                RxFloDevImageUploader $imageUploader)
    {
        $this->responseDecorator = $imageManagerControllerDecorator;
        $this->imageUploaderHandler = $imageUploader;

    }

    public function uploadImages(Request $request): JsonResponse
    {
        Log::debug('Incoming Data To Upload');
        $imagesToUpload = $request->file('imagesToUpload');

        if (empty($imagesToUpload)) {
            return response()->json($this->responseDecorator
                ->decorateErrorValidationResponse('No images to upload'));
        }


        Log::debug('REquest Images ');

        $imagesInfo = [];
        $wrongExtensionImages = [];

        foreach ($imagesToUpload as $uploadedImage) {
            Log::debug('Image To process ');
            Log::debug($uploadedImage->getClientOriginalName());

            if ($uploadedImage->getClientOriginalExtension() == 'png') {
                Log::debug('Image has correct extension ');
                $imagesInfo[] = [
                    'imageName' => $uploadedImage->getClientOriginalName(),
                    'imageExtension' => $uploadedImage->getClientOriginalExtension(),
                    'imagePath' => $uploadedImage->getRealPath(),
                ];
            } else {
                Log::debug('Image has incorrect extension ');
                $wrongExtensionImages[] = [
                    'imageName' => $uploadedImage->getClientOriginalName(),
                    'imageExtension' => $uploadedImage->getClientOriginalExtension(),
                ];
            }
        }

        if (empty($wrongExtensionImages)) {
            Log::debug('Going to upload Images to remote server ');
            $uploadedImages = $this->imageUploaderHandler->uploadImages($imagesInfo);
            Log::debug('Uploaded Images');
            Log::debug(print_r($uploadedImages, true));
            return response()->json($this->responseDecorator->decorateUploadImagesResponse($uploadedImages));
        }

        return response()->json($this->responseDecorator->decorateNoPngUploadImagesResponse($wrongExtensionImages));

    }
}
