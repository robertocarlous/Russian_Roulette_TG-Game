

# Russian_Roulette_TG-Game
Russian Roulette is a Telegram MinI Game application 



## Overview
This project is a Telegram mini-application where users participate in a staking game. Players stake tokens, spin to match a number, and compete for a chance to win the pooled tokens. The bot facilitates the game, manages staking, and handles escrow for fair play.

## Features
- **Game Creation**: A user sends a command to the bot to create a new game. The bot provides a unique game ID and a link for others to join.
- **Staking**: The game creator specifies the token amount to be staked. Users claim Aptos testnet tokens to stake in the game.
- **Multi-Player Support**: Up to two additional players can join the game using the game ID or link, and they must stake the same amount as the creator.
- **Game Start**: Once three players have joined, the bot holds the staked tokens in escrow.
- **Random Number Game**: Players pick a random number and spin. If the number spun does not match their pick, they are disqualified.
- **Winner Announcement**: The game continues until there is one winner, who receives the pooled tokens.

## Contract Structure

### State Variables
- **Players**: Tracks the players who have joined the game.
- **Stake**: Amount of tokens staked per player.
- **Escrow**: Tokens held in escrow by the bot during the game.

### Functions
- **Create Game**: Initializes a new game with a unique ID, game link, and the staked amount.
- **Join Game**: Allows other users to join the game by providing the game ID or link.
- **Claim Tokens**: Users can claim Aptos testnet tokens required for staking.
- **Start Game**: Begins the game once three players are confirmed, deducting the tokens and holding them in escrow.
- **Spin**: Each player picks a number and spins to see if they match.
- **Determine Winner**: The game eliminates players until one remains. The bot awards the winner with the pooled tokens.

## How to Contribute

### Prerequisites
- Aptos testnet wallet
- Telegram account

## contract was deployed to Aptos Testnet
Here is the contract address 

d7e864c4e6350c95955ad62eaacfc53f19eaa1ee2c197a7f9b36284c363889a8


### Steps to Contribute
1. Fork the repository and clone it locally.
2. Set up the project and ensure dependencies are installed.
3. Implement new features or fix bugs.
4. Test thoroughly using Aptos testnet tokens.
5. Submit a pull request with detailed documentation of changes.

### Contribution Guidelines
- Follow best practices for Telegram bots and smart contract security.
- Write unit tests for new features.
- Provide clear documentation for any new functionality.

## Issues
If you encounter any issues or bugs, please open an issue in the repository with detailed information on the problem and steps to reproduce it.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

