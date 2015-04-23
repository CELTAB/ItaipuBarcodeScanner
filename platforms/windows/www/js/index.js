/*
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

 /*
  By: Thiago R. M. Bitencourt
  e-mail: thiago.mbitencourt@gmail.com
 */
var app = {
    // Application Constructor
    initialize: function() {
       document.addEventListener('deviceready', this.scanner, false);
    },
    
    // ip and port used for socek connection
    ip: "127.0.0.1",
    port: "6788",

    scanner: function() {
        navigator.splashscreen.show();

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

                if (codes.length == 0) {
                  // If decode fails, send an error to socket and then close the app
                    app.socket("error", "failed");
                    window.close();
                   return;
                }
                
                var type = codes[0][0];
                var data = codes[0][2];
                
                // Scanner Success. Send result to socket
                app.socket(type, data);
                //Close app after send result
                window.close();
              };

              img.src = imageURI;
        }

        function onFail(message) {
          // If capture image fails, send an error to socket and then close the app
            app.socket("error", "failed");
            window.close();
        }
    },

    socket: function(type, code){
        var ws = new WebSocket("ws://" + app.ip + ":" + app.port, [type, code]);
    }
};

app.initialize();