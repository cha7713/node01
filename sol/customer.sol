pragma solidity >=0.4.22 < 0.6.0;

contract customer{
string public id = "new id";
string public name = "new name";
uint256 public age = 27;
 constructor(string memory _id, string memory _name, uint _age) public {
        id = _id;
        name = _name;
        age = _age;
    }
    
      function setId(string memory _id) public{
        id = _id;
        
    }
    
      function getId() public returns(string memory){
        return id;
        
    }
    
     function setName(string memory _name) public{
        name = _name;
        
    }
    
      function getName() public returns(string memory){
        return name;
        
    }
    
     function setAge(uint256  _age) public{
        age = _age;
        
    }
    
      function getAge() public returns(uint256 ){
        return age;
        
    }
    
    function setJoin(uint256  _age, string memory  _id, string memory  _name) public{
        age = _age;
        name = _name;
        id = _id;
        
    }
        
}
    