<?php
namespace App\Interfaces;

interface ResponseDecoratorInterface
{
    public function decorateErrorValidationResponse(string $errorResponse): array;

    public function decorateErrorFileUploadResponse(): array;

    public function decorateSuccessfulFileUpload(): array;
}
