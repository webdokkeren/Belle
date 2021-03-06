'use strict';

define(['app'], function (app) {

    /*****
          CONTENT, (injects the notification factory)
    ****/
    app.factory('contentFactory', function ($notification) {
        var contentArray = new Array();

        return {
            getContent: function (id) {

                if (contentArray[id] != undefined)
                    return contentArray[id];

                var content = {
                    name: "My content with id: " + id,
                    updateDate: new Date(),
                    publishDate: new Date(),
                    id: id,
                    parentId: 1234,
                    tabs: [
                    {
                            label: "Media",
                            alias: "media",
                            properties: [
                                { alias: "media", label: "Media picker", view: "umbraco.mediapicker", controller: "umbraco.mediapicker", value: "" }
                              ]
                        },
                        {
                            label: "Tab 0",
                            alias: "tab00",
                            properties: [
                                { alias: "list", label: "List", view: "umbraco.listview", value: "", hideLabel: true }
                              ]
                        },
                        {
                            label: "Tab 1",
                            alias: "tab01",
                            properties: [
                                { alias: "bodyText", label: "Body Text", description:"Here you enter the primary article contents", view: "umbraco.rte", value: "<p>askjdkasj lasjd</p>" },
                                { alias: "textarea", label: "textarea", view: "umbraco.textarea", value: "ajsdka sdjkds", config: { rows: 4 } },
                                { alias: "map", label: "Map", view: "umbraco.googlemaps", controller: "umbraco.googlemaps", value: "37.4419,-122.1419", config: { mapType: "ROADMAP", zoom: 4 } },
                                { alias: "upload", label: "Upload file", view: "umbraco.fileupload", value: "" },
                                { alias: "media", label: "Media picker", view: "umbraco.mediapicker", controller: "umbraco.mediapicker", value: "" }
                            ]
                        },
                        {
                            label: "Tab 2",
                            alias: "tab02",
                            properties: [
                                { alias: "metaText", label: "Meta Text", view: "umbraco.rte", value: "<p>askjdkasj lasjd</p>" },
                                { alias: "textarea", label: "Description", view: "umbraco.textarea", value: "ajsdka sdjkds", config: { rows: 7 } },
                                { alias: "dropdown", label: "Keywords", view: "umbraco.dropdown", value: "aksjdkasjdkj" },
                                { alias: "upload", label: "Upload file", view: "umbraco.fileupload", value: "" },
                                { alias: "code", label: "Codemirror", view: "umbraco.code", controller: "umbraco.code", value: "test" }
                            ]
                        },
                        {
                            label: "Grid",
                            alias: "tab03",
                            properties: [
                                { alias: "grid", label: "Grid", view: "umbraco.grid", controller: "umbraco.grid", value: "test", hideLabel: true }
                            ]
                        }
                    ]
                };

                return content;
            },

            //returns an empty content object which can be persistent on the content service
            //requires the parent id and the alias of the content type to base the scaffold on
            getContentScaffold: function(parentId, alias){

                //use temp storage for now...

                var c = this.getContent(parentId);
                c.name = "empty name";
                
                $.each(c.tabs, function(index, tab){
                    $.each(tab.properties,function(index, property){
                        property.value = "";
                    });
                });

                return c;
            },

            //saves or updates a content object
            saveContent: function (content) {
                contentArray[content.id] = content;
                $notification.success(content.name + " saved", "");

                //alert("Saved: " + JSON.stringify(content));
            },

            publishContent: function (content) {
                contentArray[content.id] = content;
                $notification.success(content.name + " published", "");
            }

        };
    });


    /*****
      MEDIA
    ****/
    app.factory('mediaFactory', function () {
        var mediaArray = new Array();
        return {
            rootMedia: function(){
              return [
                    {id: 1234, src: "/Media/boston.jpg", thumbnail: "/Media/boston.jpg" },
                    {src: "/Media/bird.jpg", thumbnail: "/Media/bird.jpg" },
                    {src: "/Media/frog.jpg", thumbnail: "/Media/frog.jpg" }
                ];
            }
        };
    });

    /*****
      CONTENT TYPES
    ****/
    app.factory('contentTypeFactory', function () {
        return {

            //return all availabel types
            all: function(){
                return [];
            },

            //return children inheriting a given type
            children: function(id){
                return [];
            },

            //return all content types a type inherite from
            parents: function(id){
                return [];
            },

            //return all types allowed under given document
            allowedTypes: function(documentId){
              return [
                    {name: "News Article", description: "Standard news article", alias: "newsArticle", id: 1234, cssClass:"file"},
                    {name: "News Area", description: "Area to hold all news articles, there should be only one", alias: "newsArea", id: 1234, cssClass:"suitcase"},
                    {name: "Employee", description: "Employee profile information page",  alias: "employee", id: 1234, cssClass:"user"},
                ];
            }
        };
    });


    /*****
      MACROS
    ****/
    app.factory('macroFactory', function () {
        return {

            //returns a list of all available macros
            //if a boolean is passed it will restrict the list 
            //to macros allowed in the RTE
            all: function(restrictToEditorMacros){
              return [
                    {name: "News List", description: "Standard news article", alias: "newsList"},
                    {name: "Gallery", description: "Area to hold all news articles, there should be only one", alias: "gallery"},
                    {name: "Employee", description: "Employee profile information page",  alias: "employee"},
                ];
            },

            //gets the complete macro with all properties
            getMacro: function(macroAlias){
                 return{
                        name: "News List",
                        alias: "newsList",
                        render: true,
                        useInEditor: true,
                        properties:[
                            {label: "Body Text", alias: "body", view: "umbraco.rte"},
                            {label: "Media Picker", alias: "nodeId", view: "umbraco.mediapicker"},
                            {label: "string", alias: "str", view: "umbraco.textstring"}
                        ]
                 }
            },

            //calls the server to render the macro and return the HTML
            //a <umbraco:macro> element or a macro json object can be passed
            renderMacro: function(macro, pageId){
                var html = $("<div><h1> BOOM: " + macro.name + "</h1></div>");
                var list = $("<ul></ul>")

                $.each(macro.properties, function(i, prop){
                        list.append("<li>" + prop.label + ":" + prop.value + "</li>");
                });

                return html.append(list)[0].outerHTML;
            }
        };
    });

    /*****
      TEMPLATES (not implemented)
    ****/

    app.factory('templateFactory', function () {
        return {
            getTemplate: function (id) {
                var t = {
                    name: "Master",
                    id: id,
                    path: "/Views/master.cshtml",
                    parent: "",
                    content: "<p>Hello</p>"
                };

                return t;
            },
            storeTemplate: function (template) {

            },
            deleteTemplate: function (id) {

            }
        };
    });

    return app;
});


