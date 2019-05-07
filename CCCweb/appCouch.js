const express  = require('express');
const bodyParser   = require('body-parser');
const path = require('path');
var NodeCouchDb = require('node-couchdb');


const nano = require('nano/lib/nano')('http://admin:group3@172.26.38.76:5984');
const dbNano = nano.use('realtime_tweets');

dbNano.insert(
    {
        "views": {
            "token": {
                "reduce": "function (keys, values, rereduce) {\n    if (rereduce) {\n        var result = {\n            count: values[0].count,\n            ade: values[0].ade,\n            mel: values[0].mel,\n            syd: values[0].syd,\n            can: values[0].can,\n            bri: values[0].bri,\n            hob: values[0].hob,\n            per: values[0].per,\n            vic: values[0].vic,\n            nsw:values[0].nsw,\n            qs:values[0].qs,\n            wa:values[0].wa,\n            sa:values[0].sa,\n            tas:values[0].tas\n            \n        };\n        for (var i = 1; i < values.length; i++) {\n            result.count = result.count + values[i].count;\n            result.ade = result.ade + values[i].ade;\n            result.mel= result.mel+values[i].mel;\n            result.syd=result.syd+values[i].syd;\n            result.can=result.can+values[i].can;\n            result.bri=result.bri+values[i].bri;\n            result.hob=result.hob+values[i].hob;\n            result.per=result.per+values[i].per;\n            result.vic=result.vic+values[i].vic;\n            result.nsw=result.nsw+values[i].nsw;\n            result.qs=result.qs+values[i].qs;\n            result.sa=result.sa+values[i].sa;\n            result.tas=result.tas+values[i].tas;\n            result.wa=result.wa+values[i].wa;\n        }\n        return result\n    }\n    // Non-rereduce case\n    var result = {\n        count: 0,\n        ade: 0,\n        mel: 0,\n        syd: 0,\n        can: 0,\n        bri: 0,\n        hob: 0,\n        per: 0,\n        vic: 0,\n        nsw:0,\n        qs:0,\n        sa:0,\n        tas:0,\n        wa:0\n        \n\n    }\n    \n    var Mel_list = [144.5532, -38.2250, 145.5498, -37.5401];\n    var Syd_list = [150.6396, -34.1399, 151.3439, -33.5780];\n    var Can_list = [148.9960, -35.4799, 149.3993, -35.1244];\n    var Bri_list = [152.6859, -27.6633, 153.4685, -27.0220];\n    var Ade_list = [138.4421, -35.3490, 138.7832, -34.6481];\n    var Hob_list = [147.1762, -42.9619, 147.4628, -42.6999];\n    var Per_list = [115.5607, -32.4824, 116.4151, -31.4552];\n    // add list...\n    for (var i = 0; i < keys.length; i++) {\n        if (Ade_list[0] <= values[i].x && values[i].x <= Ade_list[2] && Ade_list[1] <= values[i].y && values[i].y <= Ade_list[3]) {\n            result.ade = result.ade + 1\n        }\n        else if(Syd_list[0]<=values[i].x  && values[i].x <=Syd_list[2] && Syd_list[1]<=values[i].y && values[i].y<=Syd_list[3]){\n              result.syd = result.syd + 1\n            }\n            else if(Can_list[0]<=values[i].x && values[i].x<=Can_list[2] && Can_list[1]<=values[i].y && values[i].y<=Can_list[3]){\n                result.can = result.can + 1\n            }\n            else if (Bri_list[0]<=values[i].x && values[i].x<=Bri_list[2] && Bri_list[1]<=values[i].y && values[i].y<=Bri_list[3]){\n                result.bri = result.bri + 1\n            }\n            else if (Mel_list[0] <= values[i].x && values[i].x <= Mel_list[2] && Mel_list[1] <=values[i].y && values[i].y <= Mel_list[3]) {\n                result.mel = result.mel + 1\n            }\n            else if (Hob_list[0]<=values[i].x && values[i].x<=Hob_list[2] && Hob_list[1]<=values[i].y && values[i].y<=Hob_list[3]){\n                result.hob = result.hob + 1\n            }\n            else if (Per_list[0]<=values[i].x && values[i].x<=Per_list[2] && Per_list[1]<=values[i].y && values[i].y<=Per_list[3]){\n                result.per = result.per + 1\n            }\n        // if ...\n        if(values[i].z.indexOf('Victoria') !=-1){\n          result.vic = result.vic + 1\n        }\n        else if(values[i].z.indexOf('New South Wales') !=-1){\n          result.nsw = result.nsw + 1\n        }\n        else if(values[i].z.indexOf('Queensland') !=-1){\n          result.qs = result.qs + 1\n        }\n       else if(values[i].z.indexOf('South Australia') !=-1){\n          result.sa = result.sa + 1\n        }\n        else if(values[i].z.indexOf('Tasmania') !=-1){\n          result.tas = result.tas + 1\n        }\n        else if(values[i].z.indexOf('Western Australia') !=-1){\n          result.wa = result.wa + 1\n        }\n        result.count = result.count + 1\n    }\n    return result\n}",
                "map": "function (doc) {\n    doc_x1 = doc.place.bounding_box.coordinates[0][0][0];\n    doc_y1 = doc.place.bounding_box.coordinates[0][0][1];\n    doc_x2 = doc.place.bounding_box.coordinates[0][2][0];\n    doc_y2 = doc.place.bounding_box.coordinates[0][1][1];\n    x = (doc_x1 + doc_x2) / 2;\n    y = (doc_y1 + doc_y2) / 2;\n    z = doc.place.full_name;\n    \n    var emojis = ['🍔', '🍟', '🍕', '🌭', '🍰', '🍫', '🍦', '🍨', '🍩', '🍺', '🍻', '😋', '🤤', '🎂', '🍷', '🍬', '🍪', '🍗', '🍜']\n    var token_list = ['Burger', 'Fast food', 'Fish and chips', 'Ice cream', 'Junk food', 'Beer', 'Soft drink', 'KFC', 'Alcohol', 'McDonald', 'Hungry Jack', 'Chocolate', 'Cake', 'Doughnut', 'Cheess', 'Fried chicken', 'dominos', 'dessert', 'Candy', 'Bubble Tea']\n    for (var i = 0; i < token_list.length; i++) {\n        token_list[i] = token_list[i].toLowerCase()\n    }\n    var all = token_list.concat(emojis)\n        for (var i = 0; i < all.length; i++) {\n            if (doc.text.toLowerCase().indexOf(all[i]) != -1) {\n                emit(doc.text,{x:x,y:y,z:z});\n          break;\n       }\n        }\n}"
            },
            "total": {
                "reduce": "function (keys, values, rereduce) {\n    if (rereduce) {\n        var result = {\n            count: values[0].count,\n            ade: values[0].ade,\n            mel: values[0].mel,\n            syd: values[0].syd,\n            can: values[0].can,\n            bri: values[0].bri,\n            hob: values[0].hob,\n            per: values[0].per,\n            vic: values[0].vic,\n            nsw:values[0].nsw,\n            qs:values[0].qs,\n            wa:values[0].wa,\n            sa:values[0].sa,\n            tas:values[0].tas\n            \n        };\n        for (var i = 1; i < values.length; i++) {\n            result.count = result.count + values[i].count;\n            result.ade = result.ade + values[i].ade;\n            result.mel= result.mel+values[i].mel;\n            result.syd=result.syd+values[i].syd;\n            result.can=result.can+values[i].can;\n            result.bri=result.bri+values[i].bri;\n            result.hob=result.hob+values[i].hob;\n            result.per=result.per+values[i].per;\n            result.vic=result.vic+values[i].vic;\n            result.nsw=result.nsw+values[i].nsw;\n            result.qs=result.qs+values[i].qs;\n            result.sa=result.sa+values[i].sa;\n            result.tas=result.tas+values[i].tas;\n            result.wa=result.wa+values[i].wa;\n        }\n        return result\n    }\n    // Non-rereduce case\n    var result = {\n        count: 0,\n        ade: 0,\n        mel: 0,\n        syd: 0,\n        can: 0,\n        bri: 0,\n        hob: 0,\n        per: 0,\n        vic: 0,\n        nsw:0,\n        qs:0,\n        sa:0,\n        tas:0,\n        wa:0\n        \n\n    }\n    \n    var Mel_list = [144.5532, -38.2250, 145.5498, -37.5401];\n    var Syd_list = [150.6396, -34.1399, 151.3439, -33.5780];\n    var Can_list = [148.9960, -35.4799, 149.3993, -35.1244];\n    var Bri_list = [152.6859, -27.6633, 153.4685, -27.0220];\n    var Ade_list = [138.4421, -35.3490, 138.7832, -34.6481];\n    var Hob_list = [147.1762, -42.9619, 147.4628, -42.6999];\n    var Per_list = [115.5607, -32.4824, 116.4151, -31.4552];\n    // add list...\n    for (var i = 0; i < keys.length; i++) {\n        if (Ade_list[0] <= values[i].x && values[i].x <= Ade_list[2] && Ade_list[1] <= values[i].y && values[i].y <= Ade_list[3]) {\n            result.ade = result.ade + 1\n        }\n        else if(Syd_list[0]<=values[i].x  && values[i].x <=Syd_list[2] && Syd_list[1]<=values[i].y && values[i].y<=Syd_list[3]){\n              result.syd = result.syd + 1\n            }\n            else if(Can_list[0]<=values[i].x && values[i].x<=Can_list[2] && Can_list[1]<=values[i].y && values[i].y<=Can_list[3]){\n                result.can = result.can + 1\n            }\n            else if (Bri_list[0]<=values[i].x && values[i].x<=Bri_list[2] && Bri_list[1]<=values[i].y && values[i].y<=Bri_list[3]){\n                result.bri = result.bri + 1\n            }\n            else if (Mel_list[0] <= values[i].x && values[i].x <= Mel_list[2] && Mel_list[1] <=values[i].y && values[i].y <= Mel_list[3]) {\n                result.mel = result.mel + 1\n            }\n            else if (Hob_list[0]<=values[i].x && values[i].x<=Hob_list[2] && Hob_list[1]<=values[i].y && values[i].y<=Hob_list[3]){\n                result.hob = result.hob + 1\n            }\n            else if (Per_list[0]<=values[i].x && values[i].x<=Per_list[2] && Per_list[1]<=values[i].y && values[i].y<=Per_list[3]){\n                result.per = result.per + 1\n            }\n        // if ...\n        if(values[i].z.indexOf('Victoria') !=-1){\n          result.vic = result.vic + 1\n        }\n        else if(values[i].z.indexOf('New South Wales') !=-1){\n          result.nsw = result.nsw + 1\n        }\n        else if(values[i].z.indexOf('Queensland') !=-1){\n          result.qs = result.qs + 1\n        }\n       else if(values[i].z.indexOf('South Australia') !=-1){\n          result.sa = result.sa + 1\n        }\n        else if(values[i].z.indexOf('Tasmania') !=-1){\n          result.tas = result.tas + 1\n        }\n        else if(values[i].z.indexOf('Western Australia') !=-1){\n          result.wa = result.wa + 1\n        }\n        result.count = result.count + 1\n    }\n    return result\n}",
                "map": "function (doc) {\n  doc_x1 = doc.place.bounding_box.coordinates[0][0][0];\n  doc_y1 = doc.place.bounding_box.coordinates[0][0][1];\n  doc_x2 = doc.place.bounding_box.coordinates[0][2][0];\n  doc_y2 = doc.place.bounding_box.coordinates[0][1][1];\n  x = (doc_x1 + doc_x2) / 2;\n  y = (doc_y1 + doc_y2) / 2;\n  z = doc.place.full_name;\n  emit(doc.text,{x:x,y:y,z:z});\n}"
            }
        },
        "language": "javascript"
    }, '_design/tweets', function (error, response) {
    });

const couch = new NodeCouchDb({
    host: '172.26.38.76',
    protocol: 'http',
    port: 5984,
    auth:{
        user:'admin',
        password:'group3'
    }
});
const dbName = 'realtime_tweets';
var ade_tokenCount,syd_tokenCount,hob_tokenCount,can_tokenCount,per_tokenCount,bri_tokenCount,mel_tokenCount
var ade_totalCount,can_totalCount,bri_totalCount,per_totalCount,mel_totalCount,hob_totalCount,syd_totalCount
var vic_tokenCount,nsw_tokenCount,qs_tokenCount,sa_tokenCount,tas_tokenCount,wa_tokenCount
var vic_totalCount,nsw_totalCount,qs_totalCount,sa_totalCount,tas_totalCount,wa_totalCount

const viewTweetsCities_tokenUrl = '_design/tweets/_view/token';
couch.get(dbName,viewTweetsCities_tokenUrl).then(
    function(data,headers,status){
        ade_tokenCount=data.data.rows[0].value.ade,
        bri_tokenCount=data.data.rows[0].value.bri,
        mel_tokenCount=data.data.rows[0].value.mel,
        syd_tokenCount=data.data.rows[0].value.syd,
        can_tokenCount=data.data.rows[0].value.can,
        hob_tokenCount=data.data.rows[0].value.hob,
        per_tokenCount=data.data.rows[0].value.per,
        vic_tokenCount=data.data.rows[0].value.vic,
        nsw_tokenCount=data.data.rows[0].value.nsw,
        sa_tokenCount=data.data.rows[0].value.sa,
        wa_tokenCount=data.data.rows[0].value.wa,
        tas_tokenCount=data.data.rows[0].value.tas,
        qs_tokenCount=data.data.rows[0].value.qs
        console.log("cities:", ade_tokenCount,syd_tokenCount,hob_tokenCount,can_tokenCount,per_tokenCount,bri_tokenCount,mel_tokenCount)
        console.log("States: ", vic_tokenCount,nsw_tokenCount,qs_tokenCount,sa_tokenCount,tas_tokenCount,wa_tokenCount)
    },
    function(err){
        console.log(err);
    });
const viewTweetsStates_totalUrl = '_design/tweets/_view/total';
couch.get(dbName,viewTweetsStates_totalUrl).then(
    function(data,headers,status){
        ade_totalCount=data.data.rows[0].value.ade,
        bri_totalCount=data.data.rows[0].value.bri,
        mel_totalCount=data.data.rows[0].value.mel,
        syd_totalCount=data.data.rows[0].value.syd,
        can_totalCount=data.data.rows[0].value.can,
        hob_totalCount=data.data.rows[0].value.hob,
        per_totalCount=data.data.rows[0].value.per,
        vic_totalCount=data.data.rows[0].value.vic,
        nsw_totalCount=data.data.rows[0].value.nsw,
        sa_totalCount=data.data.rows[0].value.sa,
        wa_totalCount=data.data.rows[0].value.wa,
        tas_totalCount=data.data.rows[0].value.tas,
        qs_totalCount=data.data.rows[0].value.qs
        console.log("Cities:",ade_totalCount,can_totalCount,bri_totalCount,per_totalCount,mel_totalCount,hob_totalCount,syd_totalCount)
        console.log("States:",vic_totalCount,nsw_totalCount,qs_totalCount,sa_totalCount,tas_totalCount,wa_totalCount)
    },
    function(err){
        console.log(err);
    });


const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req,res){
        res.render('index',{
            ade_Pass:ade_tokenCount/ade_totalCount,
            bri_Pass:bri_tokenCount/bri_totalCount,
            mel_Pass:mel_tokenCount/mel_totalCount,
            syd_Pass:syd_tokenCount/syd_totalCount,
            can_Pass:can_tokenCount/can_totalCount,
            per_Pass:per_tokenCount/per_totalCount,
            hob_Pass:hob_tokenCount/hob_totalCount,
            vic_Pass:vic_tokenCount/vic_totalCount,
            nsw_Pass:nsw_tokenCount/nsw_totalCount,
            qs_Pass:qs_tokenCount/qs_totalCount,
            wa_Pass:wa_tokenCount/wa_totalCount,
            tas_Pass:tas_tokenCount/tas_totalCount,
            sa_Pass:sa_tokenCount/sa_totalCount
        });
});
app.listen(3000,function(){
   console.log('Server Started On Port 3000');
});
