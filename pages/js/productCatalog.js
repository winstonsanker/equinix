angular.module('productCatalogApp', [])
  .controller('ProductController', ['$scope','$http',function($scope,$http) {
    var prodCtrl=this;
    prodCtrl.selectedTab=1;
    prodCtrl.searchedProduct=null;
    prodCtrl.newProduct={};
    prodCtrl.message='';
 
    prodCtrl.updateSearchedProduct = function (product) {
            console.log("called from child after rest call");
            prodCtrl.searchedProduct = product;
    }

    prodCtrl.createProduct = function () {
      $http.post('/createProduct',this.newProduct)
        .success(function(msg) {
                        prodCtrl.message=msg;
                        this.newProduct={};

        }).error(function(err){
                        prodCtrl.message='product detail from server failure';
                        console.dir(err);
        });
    }

    prodCtrl.updateProduct = function () {
      $http.post('/updateProduct',this.searchedProduct)
        .success(function(msg) {
                        prodCtrl.message=msg;

        }).error(function(err){
                        prodCtrl.message='product detail from server failure';
                        console.dir(err);
        });
    }

}]).directive('jqAutocomplete', ['$http',function($http) {
      return {
          restrict: 'A',
          scope:{
                  selectedProduct:'=product',
                  message:'=msg'
          },
          link: function(scope, elm, attrs) {
              var jqueryElm = $(elm);
              $(jqueryElm).autocomplete({
                source: "/products",
                select: function( event, ui ) {
                  var product=ui.item;
                  $http.get('/productDetail?productId='+product.productId).
                    success(function(product) {
                        scope.selectedProduct=product;
                        scope.message='';
                    }).error(function(err){
                        console.log('product detail from server failure');
                        console.dir(err);
                    });
                }
              });
          }
      };
  }]);
