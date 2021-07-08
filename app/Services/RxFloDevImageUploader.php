<?php


namespace App\Services;


use App\Interfaces\ImageUploaderHandler;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use Illuminate\Support\Facades\Log;

class RxFloDevImageUploader implements ImageUploaderHandler
{

    /** @var Client $apiConsumer */
    protected Client $apiConsumer;

    /** @var string $urlApiToConsume */
    protected string $urlApiToConsume = 'https://test.rxflodev.com/';


    public function __construct(Client $apiConsumer)
    {
        $this->apiConsumer = $apiConsumer;
    }

    public function uploadImages(array $imagesToUpload): array
    {
        Log::debug('Going to Uplat these images');
        Log::debug(print_r($imagesToUpload, true));
        $uploadedImages = [];

        foreach ($imagesToUpload as $image) {
            $fileInfo = file_get_contents($image['imagePath']);
            $imageData = base64_encode($fileInfo);

            Log::debug('Image has been converted going to request the upload');


            $responseFromApi = $this->apiConsumer->request('POST',
                $this->urlApiToConsume, [
                    'form_params' => [
                        'imageData' => $imageData,
                    ],
                ]);
            Log::debug('Response from API ');
            Log::debug($responseFromApi->getBody());

            $responseBody = json_decode($responseFromApi->getBody());
            if($responseBody->status === 'success') {
                $image['imageUrl'] = $responseBody->url;
                $uploadedImages[] = $image;
            }
        }

        return $uploadedImages;
    }

    public function listImages(): array
    {
        return [];
    }

    public function deleted(array $imagesToUpload): bool
    {
        return true;
    }
}
