<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Vrejme!</title>
    <link rel="icon" type="images/png" href="images/logo.png">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>
<div class="min-vh-100 d-flex justify-content-center align-items-center" id="inputContainer">
    <form id="weatherForm">
        <input class="form-control" type="text" name="placeName" id="placeInput" placeholder="Search...">
        <input class="btn btn-light"type="submit" >
    </form> 
</div>

<div class="container d-flex flex-column min-vh-100" id="mainContainer">
    <div class="row">
        <div class="col-4 mt-5">
        </div>
        <div class="col-4">
            
        </div>
        <div class="col-4 mt-5">
        </div>
    </div>

    <div class="row">
        <div class="col-4 align-items-start">
            <div id="placeDisplay" class="mt-4 ">
            </div>
            <div id="tempDisplay" class="mt-2"> 
            </div>
            <div id="appTempDisplay" class="mt-2">
            </div>
        </div>
        <div class="col-5">
            
        </div>
        <div class="col-3 align-items-start">
            <div id="otherDisplay" class="mt-4">
            </div>
        </div>
    </div>


    <div class="row mt-auto justify-content-md-center" >
        <div id="contentArea" class="col-12 mb-5">
            <div id="dailyView" class="d-flex overflow-x-auto custom-scrollbar py-3">

            </div>
            <div id="hourlyView"  class="overflow-scroll justify-content-center flex-column">
                <div> 
                    <button id="backBtn" style="height:50%" class="btn btn-outline-light mb-3"><i class="fa-solid fa-backward"></i></button>
                </div>
                <div id="hourlyCards" class="d-flex overflow-x-auto custom-scrollbar py-3">
                </div>
            </div>
        </div>
    </div>
</div>



<script src="script.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</body>
</html>