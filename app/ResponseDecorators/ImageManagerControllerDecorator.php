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
        /*foreach ($imagesInfo as $imageInfo) {
            $imageInfoObject = json_decode(json_encode($imageInfo), false);
            $responseArray['imagesUploaded'][] = [
                'imageName' => $imageInfoObject->imageName,
                'imageUrl' => $imageInfoObject->imageUrl,
                'imageExtension' => $imageInfoObject->imageExtension,
            ];
        }*/

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
