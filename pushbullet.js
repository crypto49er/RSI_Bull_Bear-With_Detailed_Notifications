/**
 * Created by rocketman1337345 on 8/14/16.
 */

var pushbullet = require("pushbullet");
var _ = require('lodash');
var log = require('../core/log.js');
var util = require('../core/util.js');
var config = util.getConfig();
var pushbulletConfig = config.pushbullet;
var store = config.currentIndicatorValues;

var Pushbullet = function(done) {
    _.bindAll(this);

    this.pusher;
    this.price = 'N/A';

    this.done = done;
    this.setup();
};

Pushbullet.prototype.setup = function(done){

    var setupPushBullet = function (err, result) {
        if(pushbulletConfig.sendMessageOnStart){
            var title = pushbulletConfig.tag;
            var exchange = config.watch.exchange;
            var currency = config.watch.currency;
            var asset = config.watch.asset;
            var body = "Gekko has started, I've started watching "
                +exchange
                +" "
                +currency
                +" "
                +asset
                +" I'll let you know when I got some advice";
            this.mail(title, body);
        }else{
            log.debug('Skipping Send message on startup')
        }
    };
    setupPushBullet.call(this)
};

Pushbullet.prototype.processCandle = function(candle, done) {
    this.price = candle.close;

    done();
};

Pushbullet.prototype.processAdvice = function(advice) {

    if (advice.recommendation == "soft" && pushbulletConfig.muteSoft) return;
    
    if (advice.recommendation == 'long' || advice.recommendation == 'short') return;

    if (advice.recommendation == 'Bot Check in'){
        var text = "Bot ran w/o issue for last 24 hours";
    }

    if (advice.recommendation == 'Selling during Bear Trend'){
        var text = [
            'We are in a bear trend. \n\n Fast SMA: ', 
            store.SMA_short,
            '\n Slow SMA: ',
            store.SMA_long,
            '\n\n Slow SMA is above Fast SMA, indicating bear trend. \n\n Current RSI is ',
            store.rsi,
            ', which is higher than Bear RSI High of ',
            config.RSI_BULL_BEAR.BEAR_RSI_high,
            '\n\n  Buy Price: ',
            store.buyPrice,
            '\n Sell Price: ',
            store.currentPrice
        ].join(' ');
    }

    if (advice.recommendation == 'Buying during Bear Trend'){
        var text = [
            'We are in a bear trend. \n\n Fast SMA: ',
            store.SMA_short,
            '\n Slow SMA: ',
            store.SMA_long,
            '\n\n Slow SMA is above Fast SMA, indicating bear trend. \n\n Current RSI is ',
            store.rsi,
            ', which is lower than Bear RSI Low of ',
            config.RSI_BULL_BEAR.BEAR_RSI_low,
            '\n\n  Buy Price: ',
            store.buyPrice
        ].join(' ');
    }

    if (advice.recommendation == 'Selling during Bull Trend'){
        var text = [
            'We are in a bull trend. \n\n Fast SMA: ',
            store.SMA_short,
            '\n Slow SMA: ',
            store.SMA_long,
            '\n\n Slow SMA is below Fast SMA, indicating bull trend. \n\n Current RSI is ',
            store.rsi,
            ', which is greater than Bull RSI high of ',
            config.RSI_BULL_BEAR.BULL_RSI_high,
            '\n\n  Buy Price: ',
            store.buyPrice,
            '\n Sell Price: ',
            store.currentPrice

        ].join(' ');
    }

    if (advice.recommendation == 'Buying during Bull Trend'){
        var text = [
            'We are in a bull trend. \n\n Fast SMA: ',
            store.SMA_short,
            '\n Slow SMA: ',
            store.SMA_long,
            '\n\n Slow SMA is below Fast SMA, indicating bull trend. \n\n Current RSI is ',
            store.rsi,
            ', which is lower than Bull RSI low of ',
            config.RSI_BULL_BEAR.BULL_RSI_low,
            '\n\n  Buy Price: ',
            store.buyPrice
        ].join(' ');
    }

    var subject = config.watch.exchange + ': ' + config.watch.currency + '/' + config.watch.asset + ' - ' + advice.recommendation;

    this.mail(subject, text);
};

Pushbullet.prototype.mail = function(subject, content, done) {
    var pusher = new pushbullet(pushbulletConfig.key);
    pusher.note(pushbulletConfig.email, subject, content, function(error, response) {
        if(error || !response) {
            log.error('Pushbullet ERROR:', error)
        } else if(response && response.active){
            log.info('Pushbullet Message Sent')
        }
    });
};

Pushbullet.prototype.checkResults = function(err) {
    if(err)
        log.warn('error sending email', err);
    else
        log.info('Send advice via email.');
};

module.exports = Pushbullet;