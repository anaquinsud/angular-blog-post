'use strict';

/**
 * @ngdoc function
 * @name geekAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the geekAngularApp
 */
angular.module('geekAngularApp')
  .controller('MainCtrl', function ($scope,$http) {
    $scope.blogs = [
      //'HTML5 Boilerplate',
      //'AngularJS',
      //'Karma'
    ];

	$scope.refreshBlogs = function (){
    	$http.get('http://localhost:9001/blogs').
	    	then(function(response) {
	    		$scope.blogs = response.data;
	    		$scope.error = "";
		 	}, function(response) {
			 	$scope.error = "internal server error";
			});
    }
    
    $scope.refreshBlogs();

    $scope.addMyInputAwesomeThings = function(){
    	$scope.blogs.push({
    		"title":$scope.myTitle,
    		"content":$scope.myContent,
    		"post_by":"Tui",
    		"comments":[]
    		});
    	$scope.myTitle = '';
    	$scope.myContent = '';
    }

	$scope.createNewBlogPost = function(){
		var newPost = {
    		"title":$scope.myTitle,
    		"content":$scope.myContent,
    		"post_by":"Tui",
    		"comments":[]
    		};

		$http.post('http://localhost:9001/blogs', 
			newPost)
    	.then(function(response) {
    		$scope.myTitle = '';
    		$scope.myContent = '';
    		$scope.refreshBlogs();
		 }, function(response) {

		 });
    }
	

  });
