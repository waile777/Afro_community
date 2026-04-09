<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie', "storage/*", 'mix-audio/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'], //http://localhost:5173

    'allowed_headers' => ['*'],

    'supports_credentials' => false,

];
