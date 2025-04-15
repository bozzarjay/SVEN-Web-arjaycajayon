<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PAWTASTIC</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Give+You+Glory&family=Gloria+Hallelujah&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
    </style>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <script defer>
        localStorage.setItem("api", "{{ url('api') }}")
    </script>
    <script src="{{ asset('js/app.js') }}" defer></script>
    
</head>

<body>
    <div id="app"></div>
</body>

</html>