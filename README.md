# RSI Bull Bear Strategy with detailed Pushbullet notification
While the simple concept of this strategy (if A, do C; if b, do D) is easy to understand, it is much harder to track exactly what the strategy is doing. Specifically, is it buying/selling because we are in a bear trend, or a bull trend???
It certainly doesn't help things when this is the notification you get from Pushbullet (email provides the same very limited info), only telling you it is buying (long) or selling (short), providing no other information.

![simple notifications](https://i.imgur.com/xh1YPyQ.png)

So I dive into how Gekko's Pushbullet plugin works and found that you can have it push out much more information, including current price, current RSI, the slow SMA, the fast SMA, and buy price (so you can tell if a roundtrip was profitable). The end result is this:

![detail notifications](https://i.imgur.com/qFZV40p.png)

This is so much more usable IMO. I can quickly identify the reasoning why the bot made the trade. So, like what you see? Here's how to install it.

# Installation

1. Download or Git Clone this repo.
2. Move "RSI_BULL_BEAR.js" to Gekko/Strategies folder.
3. Move "pushbullet.js" to Gekko/Plugins folder. This will break push bullet for other strategies, so make a backup of the original if you want.
4. Move "config.js" to Gekko folder. Open the file, add your pushbullet key and email address you signed up for Pushbullet with. Save and close.

# Usage

Inside Gekko folder, run:

node gekko --config config.js



