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
     * @return array
     */
    public function decorateNoPngUploadImagesResponse(): array
    {
        return [
            'success' => false,
            'error' => 'Images with wrong extension ',
            'failedImages' => [],
        ];
    }

}
