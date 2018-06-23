# RSI Bull Bear Strategy with detailed Pushbullet notifications
While the simple concept of this strategy (if A, do C; if b, do D) is easy to understand, it is much harder to track exactly what the strategy is doing. Specifically, is it buying/selling because we are in a bear trend, or a bull trend???
It certainly doesn't help things when this is the notification you get from Pushbullet (email provides the same very limited info), only telling you it is buying (long) or selling (short), providing no other information.

![simple notifications](https://i.imgur.com/xh1YPyQ.png)

So I dive into how Gekko's Pushbullet plugin works and found that you can have it push out much more information, including current price, current RSI, the slow SMA, the fast SMA, and buy price (so you can tell if a roundtrip was profitable). The end result is this:

![detail notifications](https://i.imgur.com/qFZV40p.png)

This is so much more usable IMO. I can quickly identify the reasoning why the bot made the trade. 

![Check In](https://i.imgur.com/VnRBzps.png)

One additional thing I added is the bot will send out a notification every 24 hours (based on 5 minute candles) letting you know the bot is still running properly. This feature is useful if Gekko crashes a lot or if the exchange you use have issues with their API server.

So, like what you see? Here's how to install it.

# Installation

1. Download or Git Clone this repo.
2. Move "RSI_BULL_BEAR.js" to Gekko/Strategies folder.
3. Move "pushbullet.js" to Gekko/Plugins folder. This will break push bullet for other strategies, so make a backup of the original if you want.
4. Move "config.js" to Gekko folder. Open the file, add your pushbullet key and email address you signed up for Pushbullet with. Save and close. Note: The strategy now writes to the "config.js" file so if you want to use your own config file, you will need to copy the "TEMPORARY STORAGE" section.

# Usage

Inside Gekko folder, run:

node gekko --config config.js


