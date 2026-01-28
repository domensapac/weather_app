<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>

<div class="container">
    <div class="row">
        <div class="col-4 mt-5">
            <form id="weatherForm">
                <input type="text" name="placeName" id="placeInput" placeholder="Search...">
                <input type="submit" >
            </form>
            <div id="placeDisplay" class="mt-4">

            </div>
            <div id="tempDisplay" class="mt-2"> 

            </div>
            
        </div>
        <div class="col-5">
        </div>
        <div class="col-3 mt-5">
        </div>
    </div>

    
    <div class="row justify-content-md-center" >
        <div class="col col-lg-2">
        </div>
        <div id="contentArea" class="col-md-auto mb-5">
            <!--
            <div class="cardElement">
                <div class="dayText">
                    <span>Ponedeljek</span>
                </div>
                <div class="tempText">
                    <span>3°C</span>
                </div>
            </div>
        -->
        </div>
        <div class="col col-lg-2">
        </div>
    </div>


</div>




<script src="script.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</body>
</html>