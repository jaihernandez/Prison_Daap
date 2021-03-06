Prison of the Future – Ethereum dapp
Premise: 
One of the main selling points of Blockchain, in general, is the distributed ledger which allows organizations to operate without fear of data tampering and fraud. The same distributed ledger allows for a level of desired transparency to be the norm, according to the specific use case.

Prison of the Future is an Ethereum-based proof of concept dapp that showcases how our current penal systems could benefit from a transition to a distributed environment. It is safe to say that the general public would sleep more comfortably at night knowing that one corrupt official is not able to go on his computer and help a criminal avoid his/her sentence by “the click of a button”. 

Requirements to run the dapp:
-Node.js
-Truffle 
-Metamask 


Contract Deployment:
- In terminal: “truffle develop”
- In terminal: "truffle compile"
- In terminal: “migrate -–reset”
- In terminal: “test” 

Testing:
The testing scripts test the functionality of my operation functions as well some of the built-in error handling that was included
1)  This “it should statement” tests both the ability to book inmates and the ability to query the attributes of a desired inmate
2) This “it should statement” checks that 3 main aspects:
    a) Only eligible prisoners, be marked as "transferable" can be transferred to another prison
    b) The ability of a prison administrator to set a prisoner as “transferable”
    c)  Only the prison where the prisoner resides can mark him/her as “transferrable”
3) This “it should statement” tests the ability to transfer an eligible inmate to another prison
4) This “it should statement” checks that 3 main aspects:
    a)  Makes sure only an inmate who served their sentence can be release 
    b) Only the prison hosting the specified inmate can release him/her
    c)  The ability of a prison administrator to set a prisoner an eligible inmate as free
5) This “it should statement” checks the ability to query subjects who have served time or are urrently serving time in the specified preison

Running the Webapp:
A lite-server was implemented but the front end is not complete.

To run the lite-server do the following:
1) In terminal_2 (in the same repo): "ganache-cli" (Code is connected to the 8545 port)
1) In terminal: "truffle compile"
2) In terminal: "truffle migrate --reset"
3) In terminal: "npm run dev"


The lit-server can be run with npm run dev


Libraries Used:
In the event that it is needed, the “Destructible” capability was added to the smart contract “Prison.sol”. This makes the contract more dynamic and provides the flexibility to be securely destroyed when/if necessary (only owners). The OpenZeppelin library is imported in the “Prison.sol” smart contract.

The lite-server library was also used to connect to the localhost.

Design Pattern Requirements:
To make this proof of concept dapp as usable as possible and not susceptible to common errors, only one smart contract was necessary. Keeping the repository as simple as possible prevents common errors and makes testing and debugging easier. To avoid bugs and spot errors efficiently, “require” and “revert” are used throughout. This ensures constant feedback in the terminal while developing which ensures all possible mistakes and bugs are accounted for. 


Security Tools/Common Attacks:
To make the project less convoluted and less susceptible to attacks, ether transfers are currently not included in the dapp – the movement and tracking of prisoners does not require such capability.  To avoid potential Cross-chain replay attacks and potential recursive calls with the timestamp, every instance was converted and rounded down to years. To prevent any pverflow of integers, all counters are only increased by 1 on every instance. 

In addition to this, the contract has built in functions to ensure only the administrators with the right credentials can perform operational transactions in the blockchain.


# PrisonDaap

# PrisonDaap

