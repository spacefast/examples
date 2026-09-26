<?php

$auth = sf_auth();

sf_json([
    'isAuthenticated' => $auth['isAuthenticated'] ?? false,
    'isGuest' => $auth['isGuest'] ?? true,
    'userId' => $auth['userId'] ?? null,
    'provider' => $auth['provider'] ?? null,
    'user' => $auth['user'] ?? null,
]);
