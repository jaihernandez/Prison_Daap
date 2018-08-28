var Prison = artifacts.require("Prison.sol");

contract('Prison', function(accounts) {
  var testAddr0 = accounts[0];
  console.log(testAddr0);
  var testAddr1 = accounts[1];
  console.log(testAddr1);
  var testAddr2 = accounts[2];
  console.log(testAddr2);
  var testAddr3 = accounts[3];
  console.log(testAddr3);
  ///////var new_inmate;
  const yr_Stamp = Math.floor(Date.now() / 3600 / 24 / 365/ 1000);
  


  const name0 = "Jaime Hernandez";
  const name1 = "John Stone";
  const name2 = "Clay Chester";
  const name3 = "Coker Courie"
  const charge0 = "Speeding";
  const charge1 = "Insider Trading";
  const charge2 = "Bank Fraud";
  const charge3 = "Flying"
  const sentence0 = 13;
  const sentence1 = 3;
  const sentence2 = 0;
  const sentence3 = 3;
  
  var pris0;
  var pris1;
  var pris2;

//This tests both the Book function and the getPrisonner function
    it("should add the 3 prisonners below to the correct addresses with the right attributes", async() => {
        const prison = await Prison.deployed()
        //It adds 3 prisonners
          await prison.Book(name0, charge0, sentence0, {from: testAddr0});
          await prison.Book(name1, charge1, sentence1, {from: testAddr1});
          await prison.Book(name2, charge2, sentence2, {from: testAddr1});
          await prison.Book(name3, charge3, sentence3, {from: testAddr1});
         

            const result = await prison.getPrisonner.call(1)

            //Need to change comments here
            assert.equal(result[0], name1, 'the name of the prisonner is incorrect')
            assert.equal(result[1], true , 'subject should be marked as a prisonner')
            assert.equal(result[2], charge1, 'This is not the right charge')
            assert.equal(result[3].toNumber(), yr_Stamp, 'The booking date is wrong')
            assert.equal(result[4].toNumber(), yr_Stamp + sentence1, 'The release data in wrong')
            //assert.equal(result[5], sentence1, 'the sentence is wrong')
            assert.equal(result[5], testAddr1, 'the address of the prison where the prisonner is booked is incorrect')
            assert.equal(result[6], false, 'Inmate is new and should not be eligible for a transfer')

//Need to add somehting about an event
    })


    //This checks that only eligible prisoners can be marked as "transferable" and that only the prison where the prisonner resides can mark him/her as transferrable
    it("should only let eligible prisoners to be transferred to other prisons", async() => {
         const prison = await Prison.deployed()
        try {
        await assert(error, prison.transfer_in.call(1));
        } catch (error) {
            console.log("This prisonner is not eligible for a trasfer");
        }

        await prison.CanTransfer(1, {from: testAddr1});

        const result = await prison.getPrisonner.call(1)
        assert.equal(result[6], true, 'Inmate is new and should not be eligible for a transfer')


    })

    //This tests the ability to transfer prisonners to other prisons 

    it("should trasnfer eligible inamtes to the proper prisons", async() => {
        const prison = await Prison.deployed()

        await prison.transfer_in(1, {from: testAddr2});

        const result = await prison.getPrisonner.call(1)
        assert.equal(result[5], testAddr2, 'the address of the prison where the prisonner is booked is incorrect')

    })




//This checks that inmates served their entire sentence before they can be released and also that a prisonner can only be let go by their own prison
  
    it("should not let inmates who haven't served their sentence to be released", async() => {
        const prison = await Prison.deployed()
        try {
            await assert(error, prison.Release.call(1));
            } catch (error) {
                console.log("Cannot release an inmate who has not served their sentence");
            }



          try {
            await assert(error, prison.Release.call(2, {from: testAddr2}));
            } catch (error) {
                console.log("Cannot release an inmate that is not in your prison");
            }

           await prison.Release(2, {from: testAddr1});

        const result = await prison.getPrisonner.call(2)

       assert.equal(result[1], false, 'the subject should not be marked as prisonner anymore ')
       console.log("subject is no longer a prisonner");

    })

    //This tests the getPrisonList function which queries the blockchain to figure what prisonners are/have been booked where

    it("should pull only the prisonners that have served (or are serving time) in the selected prison", async() => {
        const prison = await Prison.deployed()


        const result = await prison.getPrisonList.call(testAddr1)
        assert.equal(result.length, 2, 'there should only be 2 subjects registered on this prison')
        assert.equal(result[0], 2, 'the address of the prison where the prisonner is booked is incorrect')
        assert.equal(result[1], 3, 'the address of the prison where the prisonner is booked is incorrect')

        const result2 = await prison.getPrisonList.call(testAddr3)
        assert.equal(result2.length, 0, 'returns a number of prisoners = 0 since there are no prisoners at this address')

        
    })




});
