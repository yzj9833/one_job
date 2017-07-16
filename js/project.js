/**
 * Created by Administrator on 2017/7/10.
 */
var app=angular.module('nba',['ng','ngRoute','ngAnimate']);
//主页
app.controller('bodyCtrl',['$scope','$location',function($scope,$location){
    $scope.jump=function(routeUrl){
        $location.path(routeUrl);
    };
    $scope.isActive1 = true;
    $scope.isActive2 = false;
    $scope.isActive3 = false;
    $scope.a1=function(){
        $scope.isActive1 = true;
        $scope.isActive2 = false;
        $scope.isActive3 = false;
    };
    $scope.a2=function(){
        $scope.isActive1 = false;
        $scope.isActive2 = true;
        $scope.isActive3 = false;
    };
    $scope.a3=function(){
        $scope.isActive1 = false;
        $scope.isActive2 = false;
        $scope.isActive3 = true;
    }
}]);

//路由词典
app.config(function($routeProvider){
    $routeProvider
        .when('/start',{templateUrl:'tpl/start.html',controller:'startCtrl'})
        .when('/main/:id',{templateUrl:'tpl/main.html',controller:'mainCtrl'})
        .when('/news/:id',{templateUrl:'tpl/news.html',controller:'newsCtrl'})
        .when('/star/:id',{templateUrl:'tpl/star.html',controller:'starCtrl'})
        .otherwise({redirectTo:'/start'})
});
//post请求头
app.run(function ($http) {
    $http.defaults.headers.post = {
        'Content-Type':
            'application/x-www-form-urlencoded'
    };
});
//start页面
app.controller('startCtrl',['$scope','$http',function($scope,$http){
    $http
        .get('data/start.php')
        .success(function(data){
            $scope.termList = data;
        });
}]);

app.controller('mainCtrl',['$scope','$http','$routeParams',
    function($scope,$http,$routeParams){
    $http
        .get('data/main.php')
        .success(function(data){
            $scope.teamList = data;
        });
        $scope.did = $routeParams.id;
        $http
            .get('data/main_01.php?tid='+$scope.did)
            .success(function(data){
                $scope.team=data;
                $scope.stars=data[0].starPlayer.split(",");
                $scope.players=data[0].player.split(",");
            })
}]);
app.controller('newsCtrl',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
    $scope.did = $routeParams.id;
    console.log($scope.did);
    $scope.hasMore = true;
    //新闻查询
    $http
        .get('data/news.php?tid='+$scope.did)
        .success(function(data){
            $scope.newsList = data;
        });
    //加载新闻
    $scope.loadMore=function(){
        $http
            .get('data/news.php?start='+$scope.newsList.length+'&tid='+$scope.did)
            .success(function(data){
                if(data.length<5)
                    $scope.hasMore = false;
                $scope.newsList =
                    $scope.newsList.concat(data);
            })
    };
    //东西部查询
    $scope.region=0;
    $scope.r0=function(){
        $scope.region=0;
        $http
            .get('data/news_list.php?region='+$scope.region)
            .success(function(data){
                $scope.tlist = data;
                $http
                    .get('data/news_list.php?region='+$scope.region)
                    .success(function(data){
                        $scope.tlist = data;
                    });
            });
    };
    $scope.r1=function(){
        $scope.region=1;
        $http
            .get('data/news_list.php?region='+$scope.region)
            .success(function(data){
                $scope.tlist = data;
            });
    };
    $http
        .get('data/news_list.php?region='+$scope.region)
        .success(function(data){
            $scope.tlist = data;
            console.log($scope.tlist);
        });
}]);
app.controller('starCtrl',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
        $scope.did = $routeParams.id;

}]);