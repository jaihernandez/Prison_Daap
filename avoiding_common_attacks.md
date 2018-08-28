This section is also on my README.md

Security Tools/Common Attacks:
To make the project less convoluted and less susceptible to attacks, ether transfers are currently not included in the dapp – the movement and tracking of prisoners does not require such capability.  To avoid potential Cross-chain replay attacks and potential recursive calls with the timestamp, every instance was converted and rounded down to years. To prevent any pverflow of integers, all counters are only increased by 1 on every instance. 

In addition to this, the contract has built in functions to ensure only the administrators with the right credentials can perform operational transactions in the blockchain.