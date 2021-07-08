<?php


namespace App\Interfaces;


interface ImageUploaderHandler
{

    public function uploadImages(array $imagesToUpload): array;

    public function listImages(): array;

    public function deleted(array $imagesToUpload): bool;
}
