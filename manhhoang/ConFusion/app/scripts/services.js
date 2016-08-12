"use strict";

angular.module("confusionApp")
      .constant("baseURL","http://localhost:3000/")
      .factory("MenuFactory", ["$resource", "baseURL", function($resource, baseURL){

           	var menufac = {};
           	
           	menufac.getDishes = function(){
           		return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
           	};

            menufac.getPromotion = function(index) {
                  return $resource(baseURL+"promotions/:id",null,  {'update':{method:'PUT' }});
            };

           	return menufac;
	}]).factory('CorporateFactory',["$resource", "baseURL", function($resource, baseURL) {
            var corpfac = {};
  
            corpfac.getLeaders = function() {
                return $resource(baseURL+"leadership/:id", null, {'update':{method:'PUT' }});
            };
     
            return corpfac;
  
      }]).factory('FeedbackFactory',["$resource", "baseURL", function($resource, baseURL) {
    
            var feedfac = {};
  
            feedfac.getFeedbacks = function() {
                return $resource(baseURL+"feedback/:id", null, {'update':{method:'PUT' }});
            };
     
            return feedfac;
      }]);