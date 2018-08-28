pragma solidity ^0.4.23;

// Destructible also imports Ownable contract from Zeppelin so can use Ownable functions as well
import "openzeppelin-solidity/contracts/lifecycle/Destructible.sol";

contract Prison is Destructible {

  address owner;

  uint Prisonner_Counter;

  mapping (uint => prisonner) public prisonners;


    struct prisonner {
        string name;
        string charge;
        uint imprisonment_date;
        uint date_release;
        address prison_adr;
        uint  pris_ID;
        uint sentence_years;
        bool state;
        bool toTransf;
       // address[] hist;
    }


event Imprisoned(uint Prisonner_Counter); //thi is my add in
event Free(uint Prisonner_Counter);
event TransferredIn(uint Prisonner_Counter);//this is my received


  modifier isPrisonnerHolder (uint Pris_ID) {
    require(msg.sender == prisonners[Pris_ID].prison_adr);
    /*this means run the body of the function where the modifier is used: _; */
    _;
  }


  modifier imprisoned (uint _Prisonner_Counter) {
    require(prisonners[_Prisonner_Counter].state = true);
    _;
  }
//

  modifier free (uint _Prisonner_Counter) {
    require(prisonners[_Prisonner_Counter].state = false);
    _;
  }

  
 modifier CheckSentence (uint pris_ID) {
   
   require(prisonners[pris_ID].sentence_years <=  prisonners[pris_ID].date_release - prisonners[pris_ID].imprisonment_date);
   _; 
 }


  constructor() public {
   
   
    owner = msg.sender;
    Prisonner_Counter = 0;
  }

// function convertSentence(uint t_years) public view returns (uint ConvertDate) {
//   require(t_years >=0 );
//   //Converting to hours
//   ConvertDate =  t_years ; //* 365 * 24; 

//   return ConvertDate;
// }


  function Book(string _name, string _charge,  uint _sentence_years) public {
  //Need to say that this is life imprisonment on the front end
    if (_sentence_years > 100) {
      _sentence_years = 100;
    }

    emit Imprisoned(Prisonner_Counter);
    uint HoursStamp = now / 3600 /365 /24;
    uint DateRelease =  _sentence_years + HoursStamp;

    prisonners[Prisonner_Counter] = prisonner({name: _name, charge: _charge, imprisonment_date: HoursStamp , sentence_years: _sentence_years, date_release: DateRelease, pris_ID: Prisonner_Counter,  state: true, prison_adr: msg.sender, toTransf: false});
    //mapping (uint => hist[]) public history;

    Prisonner_Counter = Prisonner_Counter + 1;
  }

 function Release(uint pris_ID) public CheckSentence(pris_ID) isPrisonnerHolder(pris_ID) {

   emit Free(pris_ID);
   prisonners[pris_ID].state = false;


 }

  function CanTransfer(uint pris_ID) public isPrisonnerHolder(pris_ID) {
    
    prisonners[pris_ID].toTransf = true;

  }


 function transfer_in(uint pris_ID)  public  {
   require(prisonners[pris_ID].toTransf == true);
   require(prisonners[pris_ID].prison_adr != msg.sender);

    emit TransferredIn(pris_ID);
    prisonners[pris_ID].prison_adr = msg.sender;
    prisonners[pris_ID].toTransf = false;
   // prisonners[pris_ID].hist.push(msg.sender) -1;

  }



///////////////////////
///Getter functions

 function getPrisonner(uint pris_ID) view public  returns (string name, bool in_prison, string charge, uint imprisonment_date, uint releaseD, address _pris_adr, bool transf) {

    return (prisonners[pris_ID].name, prisonners[pris_ID].state, prisonners[pris_ID].charge, prisonners[pris_ID].imprisonment_date, prisonners[pris_ID].date_release, prisonners[pris_ID].prison_adr, prisonners[pris_ID].toTransf );    
      
  }

function getPrisonList(address whatadr) view public returns (uint [] ID_List) {

      uint i;
      uint counter = 0;
      uint counter2 = 0;


    //because memory arrays have to have a declared size we do this in two steps
      //first step is figure out the count, then declare the array, then fill with values
      for (i = 0;i <= Prisonner_Counter; i++) {
        // string comparison not supported work around is to compare hash
        if (prisonners[i].prison_adr == whatadr) {
          counter ++; //this is the array placement variable
         //pris_listIDs.push(prisonners[i].pris_ID) -1;

          //return (pris_listIDs, i);
        }
      }

          


      uint[] memory pris_listIDs = new uint [] (counter);
      for (i = 0;i <= Prisonner_Counter; i++) {
        // string comparison not supported work around is to compare hash
        if (prisonners[i].prison_adr == whatadr) {
          counter2 ++; //this is the array placement variable
         //pris_listIDs.push(prisonners[i].pris_ID) -1;
          pris_listIDs[counter2 - 1] = i;
          //return (pris_listIDs, i);
        }
      }

      return (pris_listIDs);



}



}
