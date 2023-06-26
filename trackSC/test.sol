pragma solidity ^0.4.24;
 
contract Map3 {
 
    mapping(string => string) map;
    
    event orderlog(string indexed action, string indexed key, string value);
    
    function getvalue(string key) public constant returns (string) {
        return map[key];
    }
    
    function setvalue(string key, string value) public {
        emit orderlog("setvalue haha", key, value);
        map[key] = value;
    }
}