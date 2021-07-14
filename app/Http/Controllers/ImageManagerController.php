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

    /**
     * ImageManagerController constructor
     *
     * @param ImageManagerControllerDecorator $imageManagerControllerDecorator
     * @param RxFloDevImageUploader $imageUploader
     */
    public function __construct(ImageManagerControllerDecorator $imageManagerControllerDecorator,
                                RxFloDevImageUploader $imageUploader)
    {
        $this->responseDecorator = $imageManagerControllerDecorator;
        $this->imageUploaderHandler = $imageUploader;

    }

    /**
     * Starting point to process the uploaded images request
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function uploadImages(Request $request): JsonResponse
    {
        $imagesToUpload = $request->file('imagesToUpload');

        $imagesInfo = [];
        $wrongExtensionImages = false;

        foreach ($imagesToUpload as $uploadedImage) {
            if ($uploadedImage->getClientOriginalExtension() == 'png') {
                Log::debug('Image has correct extension ');
                $imagesInfo[] = [
                    'imageName' => $uploadedImage->getClientOriginalName(),
                    'imageExtension' => $uploadedImage->getClientOriginalExtension(),
                    'imagePath' => $uploadedImage->getRealPath(),
                ];
            } else {
                $wrongExtensionImages = true;
                break;
            }
        }

        if ($wrongExtensionImages === false) {

            $uploadedImages = $this->imageUploaderHandler->uploadImages($imagesInfo);
            if(!empty($uploadedImages)) {
                return response()->json($this->responseDecorator->decorateUploadImagesResponse($uploadedImages));
            }

            return response()->json($this->responseDecorator->decorateErrorFileUploadResponse());

        }

        return response()->json($this->responseDecorator->decorateNoPngUploadImagesResponse());

    }
}
