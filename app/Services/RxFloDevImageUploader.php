<?php


namespace App\Services;


use App\Interfaces\ImageUploaderHandler;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;

class RxFloDevImageUploader implements ImageUploaderHandler
{

    /** @var Client $apiConsumer */
    protected Client $apiConsumer;

    /** @var string $urlApiToConsume */
    protected string $urlApiToConsume = 'https://test.rxflodev.com/';

    /**
     * RxFloDevImageUploader constructor.
     *
     * @param Client $apiConsumer
     */
    public function __construct(Client $apiConsumer)
    {
        $this->apiConsumer = $apiConsumer;
    }

    /**
     * @param array $imagesToUpload
     * @return array
     *
     */
    public function uploadImages(array $imagesToUpload): array
    {
        $uploadedImages = [];

        try {
            foreach ($imagesToUpload as $image) {
                $fileInfo = file_get_contents($image['imagePath']);
                $imageData = base64_encode($fileInfo);

                $responseFromApi = $this->apiConsumer->request('POST',
                    $this->urlApiToConsume, [
                        'form_params' => [
                            'imageData' => $imageData,
                        ],
                    ]);

                $responseBody = json_decode($responseFromApi->getBody());

                if($responseBody->status === 'success') {
                    $uploadedImages[] = [
                        'imageName' => $image['imageName'],
                        'imageUrl' => $responseBody->url,
                        'imageExtension' => $image['imageExtension'],
                    ];
                }
            }
        } catch (GuzzleException $error) {
            Log::error('Error in request to upload to the images ');
            Log::error($error->getMessage());
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
