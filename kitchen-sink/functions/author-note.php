<?php

$body = sf_body();
$message = is_array($body) && is_string($body['message'] ?? null)
    ? trim($body['message'])
    : '';

if ($message === '') {
    sf_json([
        'runtime' => 'php',
        'route' => '/author-note',
        'usage' => 'POST JSON with a message to queue an editor note.',
        'auth' => sf_auth(),
    ]);
}

try {
    $messageId = sf_email([
        'to' => 'editor@example.com',
        'subject' => 'Field Notes author message',
        'text' => substr($message, 0, 2000),
    ]);
    sf_json(['accepted' => true, 'messageId' => $messageId], 202);
} catch (SpacefastServiceError $error) {
    sf_json(['accepted' => false, 'code' => $error->errorCode], 503);
}
