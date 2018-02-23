/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
const util = require('util')
process.env.DEBUG = 'actions-on-google:*';

const Assistant = require('actions-on-google').ApiAiAssistant;
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const know = admin.database().ref('homes');
const graph = know.child('graph');

// Dialogflow Intent names
const PLAY_INTENT = 'play';
const NO_INTENT = 'discriminate-no';
const YES_INTENT = 'discriminate-yes';
const GIVEUP_INTENT = 'give-up';
const LEARN_THING_INTENT = 'learn-thing';
const LEARN_DISCRIM_INTENT = 'learn-discrimination';

// Contexts
const WELCOME_CONTEXT = 'welcome';
const QUESTION_CONTEXT = 'question';
const GUESS_CONTEXT = 'guess';
const LEARN_THING_CONTEXT = 'learn-thing';
const LEARN_DISCRIM_CONTEXT = 'learn-discrimination';
const ANSWER_CONTEXT = 'answer';

// Context Parameters
const ID_PARAM = 'id';
const BRANCH_PARAM = 'branch';
const LEARN_THING_PARAM = 'learn-thing';
const GUESSABLE_THING_PARAM = 'guessable-thing';
const LEARN_DISCRIMINATION_PARAM = 'learn-discrimination';
const ANSWER_PARAM = 'answer';
const QUESTION_PARAM = 'question';


const INIT = 'start';
const BUY_INTENT_MORE = 'buy_intent_more';
const PRICEBB = 'buy_price_bed_bath';



exports.assistanttest = functions.https.onRequest((request, response) => {
        console.log('headers: ' + JSON.stringify(request.headers));
console.log('body: ' + JSON.stringify(request.body));

const assistant = new Assistant({request: request, response: response});


let actionMap = new Map();
actionMap.set(INIT, play);
actionMap.set(BUY_INTENT_MORE, buyIntentMore);
actionMap.set(PRICEBB, buyIntentfinal);

assistant.handleRequest(actionMap);


const parameters= request.body.result.parameters;
const property_type= parameters['property_type'];
console.log("propoert="+property_type);
const city= parameters['geo-city'];
console.log("City="+city);
const sale_type= new RegExp(parameters['sale_type'],'i');
console.log("saletype="+sale_type);
const bedroom= parameters['bedroom'];
const bathroom= parameters['bathroom'];
console.log("bathroom="+bathroom);
const price= parameters['price'];
console.log("price="+price.amount);
// console.log(zip);
// console.log(city);

// reference
 function play() {
     console.log("know: "+know );
     know.orderByKey().once('value', function(snap) {
         console.log("hiiii");
         var obj = snap.val();
       //  console.log("allobj: "+obj.homes[0].propid);
         console.log(util.inspect(obj, false, null));
         console.log("allobj: "+obj[0].address);
         // console.log(obj.length+ "length");
         // snap.val(); // first item, in format {"<KEY>": "<VALUE>"}
                        const speech = `<speak>
            Great! Think of an animal, but don't tell me what it is yet. <break time="3"/>
            Okay, my first question is ${obj[0].address}
            </speak>`;

         // for (var x in obj) {
         //     console.log(x);
         //     console.log(obj[x].address);
         // }


         obj.forEach( function (arrayItem)
         {

             var x = arrayItem.address;
             if(x=="4409 Newport Ave"){
                 console.log(x);
             }

            // console.log(x);
         });

         assistant.ask(speech);
     });
}
// Referecee ends


function buyIntentMore(){
    know.orderByKey().once('value', function(snap) {
        var obj = snap.val();
        var speech="";
        var count=0;
        obj.forEach( function (arrayItem)
        {
            try {
                  var x = arrayItem.property_type;
                  var y = arrayItem.listing_status;
                  var p = arrayItem.location.city.label;
                 // var saletype="sell";
                  // if(sale_type.match("sale"))
                  //     saletype="sale";
                  console.log("before loop");
                  if (x == property_type && p.match(city)) {

                      count++;
                      // speech= 'There is a property available for sale at '+arrayItem.address+'. Do you want to contact to the agent';
                      // console.log(speech+" speech");
                      // assistant.ask(speech);
                      // return false;
                  }
            }catch(e){
                  console.log(e);
            }

        });
        assistant.ask("There are "+count+" properties available with your requirements. Can you specify number of bedroom and bathroom with your price range ?");

    });
}

function buyIntentfinal(){
    know.orderByKey().once('value', function(snap) {
        var obj = snap.val();
        var speech="";
        var count=0;
        var pri=price.amount;
        var address="address";
        obj.forEach( function (arrayItem)
        {
            try {
                var x = arrayItem.property_type;
                var y = arrayItem.listing_status;
                var p = arrayItem.location.city.label;
                var bed= arrayItem.bedrooms;
                var bath= arrayItem.bathrooms;
                var priceval=arrayItem.priceShort;
                console.log("inside bed bath "+ bed +" " +bath+" rooms");
                // var saletype="sell";
                // if(sale_type.match("sale"))
                //     saletype="sale";

                console.log("before loop "+bed+" "+bedroom+" bath "+bath+" "+ bathroom+" prop "+x+" "+property_type+" city"+ p+" "+ city+" "+priceval);
                if (x == property_type && p.match(city) && bed==bedroom && bath==bathroom && priceval=="$233k") {
                    address=arrayItem.address;
                    count++;
                    // speech= 'There is a property available for sale at '+arrayItem.address+'. Do you want to contact to the agent';
                    // console.log(speech+" speech");
                    // assistant.ask(speech);
                    // return false;
                }
            }catch(e){
                console.log(e);
            }

        });
        assistant.ask("There is "+count+" property available with your requirements at "+address+". Do you want the agent to contact you ?");

    });
}


// function foremail(){
//
//     var nodemailer = require('nodemailer');
//     var transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: '@gmail.com',
//             pass: ''
//         }
//     });
//
// // console.log('created');
//     transporter.sendMail({
//         from: '@gmail.com',
//         to: 'mmari016@odu.edu',
//         subject: 'Test email for dominion homes App!',
//         text: 'Hope you have a great day!'
//     });
//
// }



});


