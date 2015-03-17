﻿/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    scanner: function() {
        document.getElementById("codeType").innerHTML = "";
        document.getElementById("codeContent").innerHTML = "";

        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            destinationType: Camera.DestinationType.FILE_URI
        });

        function onSuccess(imageURI) {
            var img = new Image();

            img.onload = function () {
                var canvas = document.createElement('canvas');
                // resizing image to 320x240 for slow devices
                var k = (320 + 240) / (img.width + img.height);

                canvas.width = Math.ceil(img.width * k);
                canvas.height = Math.ceil(img.height * k);
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, img.width, img.height,
                              0, 0, canvas.width, canvas.height);

                var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
                
                var codes = zbarProcessImageData(data);

                if (codes.length === 0) {
                   document.getElementById("codeContent").innerHTML = "Código Inválido";
                }
                
                var type = codes[0][0];
                var data = codes[0][2];
                
                // publishing data
                document.getElementById("codeContent").innerHTML = data;
                document.getElementById("codeType").innerHTML = type;

                var div = document.getElementById("app");
                div.querySelector('#btScanner').setAttribute('style', 'display:none;');
                document.getElementById("btOk").setAttribute('style', 'display:block;');
              };
              img.src = imageURI;
        }

        function onFail(message) {
            document.getElementById("codeContent").innerHTML = 'Failed: ' + message);
        }

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {

        var buttonScan = document.getElementById("btScanner");
        var buttonOk = document.getElementById("btOk");

        buttonScan.onclick = app.scanner;
        buttonOk.onclick = function(){
            //navigator.app.exitApp();
        };
    }
};

app.initialize();