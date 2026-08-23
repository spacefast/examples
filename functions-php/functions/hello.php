<?php

$body = sf_body();
$name = is_array($body) && is_string($body['name'] ?? null)
    ? trim($body['name'])
    : '';

sf_json([
    'hello' => $name === '' ? 'world' : $name,
    'runtime' => 'php',
    'received' => $body,
]);
