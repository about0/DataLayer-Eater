const express = require('express'),
  async = require('async'),
  https = require('https'),
  bodyParser = require('body-parser'),
  app = express(),
  cors = require('cors'),
  fs = require('fs'),
  jade = require('jade'),
  pug = require('pug'),
  MongoClient = require('mongodb').MongoClient,
  ObjectId = require('mongodb').ObjectID;

const mongoURL = 'mongodb://zenderr:08201455@ds052649.mlab.com:52649/datalayer_punisher'
app.set('view engine', 'pug');
app.set('views', './views')
function dbConnect(URL, data, callback) {
  MongoClient.connect(URL, (err, db) => {
    if (!err) {
      console.log('Connected')
    }
    callback();
  })

}

function insertDocument(db, data, callback) {
  db.collection('dataLayers').insert(data, function (err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log('Document Inserted')
      console.log(result)
    }
    callback();
  })
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

let dummyData = '{"site_name":"Previously Owned by a Gay Man","site_description":"","page_type":"home","post_title":"Home","post_author":"Michele Hofherr","post_date":"2016/02/07","edit_lock":["1500093877:8217"],"edit_last":["8217"],"wp_page_template":["page_home_v2.php"],"yoast_wpseo_meta-robots-noindex":["1"],"yoast_wpseo_meta-robots-nofollow":["1"],"pgm_home_banner_enabled":["field_56af8be5e0ec3"],"pgm_home_new_items_enabled":["field_56b66bf906e5b"],"pgm_home_shop_enabled":["field_56b66bf806e5a"],"pgm_home_collections_enabled":["field_56b66bfa06e5c"],"pgm_home_inspiration_enabled":["field_56b66bfc06e5d"],"pgm_home_social_enabled":["field_56b66bfd06e5e"],"pgm_home_video_enabled":["field_56b66bff06e5f"],"pgm_home_banner_text":["field_56af8bc5e0ec1"],"pgm_home_banner_image_id":["field_56af8bd1e0ec2"],"pgm_home_new_items_heading":["field_56af8c359b91d"],"pgm_home_new_product_ids":["field_56b661e9d6d03"],"pgm_home_shop_heading":["field_56af8c539b91f"],"pgm_home_shop_categories":["field_56af8c609b920"],"pgm_home_collections_heading":["field_56af8cbfabb4a"],"pgm_home_shop_collections":["field_56af8ce7abb4c"],"pgm_home_inspiration_heading":["field_56af8d0343e23"],"pgm_home_inspiration_categories":["field_56b63c47aa41c"],"pgm_home_inspiration_count":["field_56b656487b296"],"pgm_home_social_heading":["field_56b6544aafc54"],"pgm_home_social_images":["field_56b654d596b49"],"pgm_home_video_title":["field_56af8d4c67086"],"pgm_home_video_id":["field_56af8d5667087"],"pgm_home_shop_collections_parent_id":["field_56af8ce7abb4c"],"pgm_home_banner_link":["field_56c73da2e7470"],"pgm_home_social_instagram_user_id":["field_56b654d596b49"],"pgm_home_social_instagram_token":["field_56d731510a636"],"yoast_wpseo_title":["Shop the Slash Sale at Previously Owned by a Gay Man!"],"yoast_wpseo_metadesc":["Openly Good Furniture."],"pgm_home_shop_collections_categories":["field_56af8ce7abb4c"],"yoast_wpseo_content_score":["30"],"yoast_wpseo_focuskw_text_input":["Shop the Fabulous Beekman Collection at Previously Owned by a Gay Man!"],"yoast_wpseo_focuskw":["Shop the Fabulous Beekman Collection at Previously Owned by a Gay Man!"],"pgm_seller_percent":["field_5697bd31280f4"],"billing_payee":["field_58c658e7759dc"],"genesis_scripts_body_position":["bottom"],"pgm_home_video_subtitle":["field_5956162c012c1"],"pgm_home_bottom_video_enabled":["field_5956120b8aac5"],"pgm_home_bottom_video_title":["field_595612818aac6"],"pgm_home_bottom_video_id":["field_595612a88aac7"],"removed_cart_contents":[],"applied_coupons":[],"coupon_discount_amounts":[],"coupon_discount_tax_amounts":[],"coupon_applied_count":[],"coupons":[],"cart_contents_total":0,"total":0,"subtotal":0,"subtotal_ex_tax":0,"tax_total":0,"taxes":[],"shipping_taxes":[],"discount_cart":0,"discount_cart_tax":0,"fee_total":0,"shipping_total":0,"shipping_tax_total":0,"fees":[],"site_currency":"USD","_pathname1":"","cp.utag_main_v_id":"015e4e5d28e100209784986c567c02073002406b00bd0","cp.utag_main__sn":"5","cp.utag_main__ss":"0","cp.utag_main__st":"1504998478364","cp.utag_main_ses_id":"1504994999829","cp.utag_main__pn":"2","cp.wt3_eid":";851020650583970|2150455328100268815#2150492188100944167","cp.wt_rla":"851020650583970,4,1504921545564","cp.pgm_subscribe_popup":"1","cp.PHPSESSID":"c70873fa0678b6ffc864f73d365a2acc","cp.utagdb":"true","cp._ga":"GA1.2.99898860.1504553282","cp._gid":"GA1.2.794653590.1504921545","cp._vwo_uuid_v2":"E1D405A9861050F07855D422781B9191|2861aa81d913df1626bdc2a02c371d68","meta.viewport":"width=device-width, initial-scale=1","meta.description":"Openly Good Furniture.","meta.robots":"noindex,nofollow","meta.og:locale":"en_US","meta.og:type":"website","meta.og:title":"Shop the Slash Sale at Previously Owned by a Gay Man!","meta.og:description":"Openly Good Furniture.","meta.og:url":"https://pobagm.staging.wpengine.com/","meta.og:site_name":"Previously Owned by a Gay Man","meta.og:image":"http://pobagm.wpengine.com/wp-content/themes/genesis-pgm/images/logo.svg","meta.twitter:card":"summary","meta.twitter:description":"Openly Good Furniture.","meta.twitter:title":"Shop the Slash Sale at Previously Owned by a Gay Man!","meta.twitter:site":"@POBAGM","meta.twitter:image":"http://pobagm.wpengine.com/wp-content/themes/genesis-pgm/images/logo.svg","meta.twitter:creator":"@POBAGM","meta.p:domain_verify":"ce9ca5a97c34224e4cb42c3fe0c7f7e9","meta.msapplication-TileImage":"https://pobagm.staging.wpengine.com/wp-content/themes/genesis-pgm/build/images/favicons/favicon-144.png","dom.referrer":"","dom.title":"Shop the Slash Sale at Previously Owned by a Gay Man!","dom.domain":"pobagm.staging.wpengine.com","dom.query_string":"","dom.hash":"","dom.url":"https://pobagm.staging.wpengine.com/","dom.pathname":"/","dom.viewport_height":949,"dom.viewport_width":887,"ut.domain":"wpengine.com","ut.version":"ut4.44.201709091951","ut.event":"view","ut.visitor_id":"015e4e5d28e100209784986c567c02073002406b00bd0","ut.session_id":"1504994999829","ut.account":"pogm","ut.profile":"test","ut.env":"dev","tealium_event":"view","tealium_visitor_id":"015e4e5d28e100209784986c567c02073002406b00bd0","tealium_session_id":"1504994999829","tealium_datasource":"","tealium_account":"pogm","tealium_profile":"test","tealium_environment":"dev","tealium_random":"3253880735834545","tealium_library_name":"utag.js","tealium_library_version":"4.44.0","tealium_timestamp_epoch":1504996678,"tealium_timestamp_utc":"2017-09-09T22:37:58.365Z","tealium_timestamp_local":"2017-09-10T01:37:58.365","_ccity":"","_ccountry":"","_ccurrency":"","_ccustid":"","_corder":"","_cpromo":"","_cship":"","_cstate":"","_cstore":"web","_csubtotal":"","_ctax":"","_ctotal":"0.00","_ctype":"","_czip":"","_cprod":[],"_cprodname":[],"_cbrand":[],"_ccat":[],"_ccat2":[],"_cquan":[],"_cprice":[],"_csku":[],"_cpdisc":[]}'
app.post('/post/', function (req, res) {
  const timeStamp = Math.floor(Date.now() / 1000)
  let data = {
    timestamp: timeStamp,
    dataLayer: JSON.stringify(req.body)
  }

  MongoClient.connect(mongoURL, (err, db) => {
    if (!err) {
      console.log('Connected')
    }
    insertDocument(db, data, function () {
      db.close();
    })
  })

});


app.get('/', (req, res) => {
  let dbData;
  MongoClient.connect(mongoURL, (err, db) => {
    if (!err) {
      console.log('Connected')
    }
    dbData = db.collection('dataLayers').find() || 'NO DATA'
    console.log(db.get('dataLayers') || 'NO DATA')
  })

  console.log(dbData)
  res.render('home', {
    json: dbData
  });
})


https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app).listen(7002);