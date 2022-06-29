### Block.Difficulty
A POC ERC721 + Sablier game


### Installation

1. ``yarn install`` 
2. ``yarn start``
3.  ``embark test --node http://localhost:8546`` to unit test


Everything is still a WIP and hella code cleaning i had to digress from the orignal idea buuut hoping to continue in the future the current state of the game is preetty buggy

### Please ensure you have IPFS installed on your machine before starting

### Screenshots
1. ![Usage](/screenshots/1.png)
3. ![Usage](/screenshots/3.png)

### Demo
1.    ![Usage](/screenshots/demo.gif)
### How it Works 

Use the mouse left click to move Block.Difficulty around\n
GamePlay\n
- The game basically works on the premise that you collect as the dots which correspond to Block.Difficultys current color
- Collecting an incorrect color reduces the size of Block.Difficulty
- Block.Difficulty changes color constantly!
- Collecting an incorrect color also reduces the time given to complete the current level
- With each color collected a the player gets 100000000000000000000 TT tokens which will be streamed to the player 2 hours after the game ends
- Time can be bought through the sablier protocol by simply clicking on the add time button on the left of the screen this will increase the time left to collect the colors  
- The user needs to add the TT Token address to their metamask when they start a new game the address is displayed on the popup box
- Replays of the current game session can be viewed under the Replays tab and are saved on ipfs
-  

Most of the ideas above where implemented but commented out see unit test file under the test folder

### Future Work

1. Include option for user to revoke transfer of tokens during the purchasing of more game time 
       
    



