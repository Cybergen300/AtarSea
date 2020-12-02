# AtarSea

Code for the AtarSea decentralized cryptocurrency trading exchange

In this repository you'll find the current code for this project aiming to create a full fledge decentralized cryptocurrency exchange. Note: This project being still under development the code will change over time.

Go check this link to see the current development state : https://cybergen.jimdofree.com/blockchain/blockchain-project/atarsea/

Update : If you have metamask on your web browser you can now access directly the Dapp on the Kovan network at this address : https://atarsea.herokuapp.com/


However if you have already a basic blockchain dev environment :

    metamask account
    Node.js
    truffle
    Infura
    Ganache

I'll make sure that at any time you're able to run the Dapp locally on your default browser by following these 5 easy steps :

    open console
    run "npm install"
    run "truffle migrate --reset"
    run "truffle exec scripts/seed-exchange.js"
    run "truffle exec scripts/sUSD_seed.js"
    run "npm start"

n.b. Don't forget to set up your Metamask account on local dev at first as the migration we'll be done by default on the local env.
