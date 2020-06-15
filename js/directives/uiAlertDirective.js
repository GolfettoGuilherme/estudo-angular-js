angular.module("listaTelefonica").directive("uiAlert", function(){
    return{
        templateUrl: './view/alert.html',
        replace: true,
        restrict: "AE",
        //isso é para separar esse scope do scope pai
        scope: {
            title: "@", //como tanto no scope pai quanto nessa diretiva eles tem o mesmo nome, só coloca o @
            //message: "=" //para aplicar o two way data biding
        },
        transclude: true
    };
});