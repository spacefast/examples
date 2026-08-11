<?php

$body = sf_body();
$message = is_array($body) && is_string($body['message'] ?? null)
    ? trim($body['message'])
    : '';

if ($message === '') {
    sf_json([
        'runtime' => 'php',
        'route' => '/php-note',
        'usage' => 'POST JSON with a message.',
        'auth' => sf_auth(),
    ]);
}

sf_json([
    'runtime' => 'php',
    'accepted' => true,
    'preview' => substr($message, 0, 120),
], 202);
