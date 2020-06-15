angular.module('listaTelefonica').controller("listaTelefonicaCtrl",function($scope, contatosAPI, operadorasAPI, serialGenerator){
    $scope.app = "Lista Telefonica";
    $scope.contatos = [];
    $scope.operadoras = [];
    

    var carregarContatos = function() {
        contatosAPI.getContatos().then(function (data,status) {
            $scope.contatos = data.data;
        }).catch(function(data){
            $scope.message = "tivemos um problema";
        });
    }

    var carregarOperadoras = function(){
        operadorasAPI.getOperadoras().then(function(data){
            $scope.operadoras = data.data;
        })
    }

    $scope.adicionarContato = function(contato){
        contato.id = serialGenerator.generateId()
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        contatosAPI.saveContato(contato).then(function(data){
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });
        
    }

    $scope.apagarContatos = async function(contatos){
        const aDeletar = contatos.filter(function(contato){
            if(contato.selecionado) return contato;
        });

        for(const el of aDeletar){
            await contatosAPI.deleteContato(el).then(function(data){
                console.log(data);
            });
        }
        carregarContatos();
    }

    $scope.isContatoSelecionado = function(contatos){
        return contatos.some(function(contato){
            return contato.selecionado;
        });
    }

    $scope.ordernarPor = function(campo){
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    }

    $scope.classe1 = "selecionado";
    $scope.classe2 = "negrito";

    carregarContatos();
    carregarOperadoras();
    
});