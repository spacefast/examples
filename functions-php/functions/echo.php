<?php

$body = sf_body();
$message = is_array($body) && is_string($body['message'] ?? null)
    ? trim($body['message'])
    : '';

if ($message === '') {
    sf_json([
        'accepted' => false,
        'error' => 'Send a non-empty message.',
    ], 422);
}

sf_json([
    'accepted' => true,
    'length' => strlen($message),
    'preview' => substr($message, 0, 120),
], 202);
