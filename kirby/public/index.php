<?php

define('KIRBY_HELPER_DUMP', false);

$base = dirname(__DIR__);

require $base . '/vendor/autoload.php';
\JohannSchopplich\Helpers\Env::load(dirname($base));

$kirby = new \Kirby\Cms\App([
    'roots' => [
        'index'    => __DIR__,
        'base'     => $base,
        'site'     => $base . '/site',
        'storage'  => $storage = $base . '/storage',
        'content'  => $storage . '/content',
        'accounts' => $storage . '/accounts',
        'cache'    => $storage . '/cache',
        'logs'     => $storage . '/logs',
        'sessions' => $storage . '/sessions',
    ]
]);

echo $kirby->render();
