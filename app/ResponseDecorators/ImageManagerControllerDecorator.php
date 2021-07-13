<?php


namespace App\ResponseDecorators;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;

/**
 * Class LoginControllerDecorator
 * @package App\Decorators
 */
class ImageManagerControllerDecorator extends GenericResponsesDecorator
{

    /**
     * @param array $imagesInfo
     * @return array
     */
    public function decorateUploadImagesResponse(array $imagesInfo = []): array
    {
        return [
            'success' => true,
            'imagesUploaded' => $imagesInfo,
        ];
    }

    /**
     * @param array $imagesInfo
     * @return array
     */
    public function decorateNoPngUploadImagesResponse(array $failedImages = []): array
    {
        $responseArray = [
            'success' => false,
            'error' => 'Images with wrong extension ',
            'failedImages' => [],
        ];

        foreach ($failedImages as $failedImage) {
            $failedImageObject = json_decode(json_encode($failedImage), false);
            $responseArray['failedImages'][] = [
                'imageName' => $failedImageObject->imageName,
                'imageExtension' => $failedImageObject->imageExtension,
            ];
        }

        return $responseArray;
    }

}
