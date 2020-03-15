pragma solidity >=0.4.22 <0.6.0;
contract Manitto {

    
    struct Manittoranking {
        string userName;
        string date;
        uint8 likeCount;
        uint8 best;
    }
    
    address manittoOwner;
    Manittoranking[] ranking;

    constructor() public {
        manittoOwner=msg.sender;
    }

    function insertRanking
    (
    string memory userName,
    string memory date,
    uint8 likeCount,
    uint8 best
    ) public {
        if (msg.sender != manittoOwner) return;
        Manittoranking memory tempRanking=Manittoranking(userName,date,likeCount,best);
        ranking.push(tempRanking);
    }
    
    function getRanking (uint index)
    public view returns(
        string memory userName,
        string memory date,
        uint8 likeCount, 
        uint8 best)
    {
       userName=ranking[index].userName;
       date=ranking[index].date;
       likeCount=ranking[index].likeCount;
       best=ranking[index].best;
       
    }

   function getIndex() public view returns(
        uint256 index)
    {
        index=ranking.length;
    }

    
}