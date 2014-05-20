Getting started guide
====================

Run the app
--------------------

+ Start the database (MongoDb): $ mongod
+ Start compass for watching styles: $ compass watch -e development
+ Strat the server:

$ DEBUG=my-application \
FACEBOOK_APP_ID=<MY_FACEBOOK_APP_ID> \
FACEBOOK_APP_SECRET=<MY_FACEBOOK_APP_SECRET> \
HOST=http://localhost \
SESSION_SECRET=<my_session_secret> \
node server


Deploy the app to testing environment
---------------------

+ TBD