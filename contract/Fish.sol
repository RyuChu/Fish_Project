pragma solidity ^0.5.11;

contract Fish {
    // 合約擁有者
    address private owner;
    
    struct UserStruct{
        string userName;
        string userPwd;
        bool isUser;
    }
    
    mapping (address => UserStruct) public userStructs;

    // 事件們，用於通知前端 web3.js
    event newUserEvent(address indexed from, string name, uint256 timestamp);
    event deleteUserEvent(address indexed from, string name, uint256 timestamp);
    event updateUserEvent(address indexed from, string name, uint256 timestamp);
    event LoginEvent(address indexed from, string name, uint256 timestamp);

    modifier isOwner() {
        require(owner == msg.sender, "you are not owner");
        _;
    }

    // 建構子
    constructor() public payable {
        owner = msg.sender;
    }
    
    // 確認用戶是否已存在
    function isUser(address userAddress) public returns (bool) {
        return userStructs[userAddress].isUser;
    }

    // 註冊新用戶
    function newUser(string memory userName, string memory userPwd) public returns (bool) {
        if(isUser(msg.sender)) revert(); 
        userStructs[msg.sender].userName = userName;
        userStructs[msg.sender].userPwd = userPwd;
        userStructs[msg.sender].isUser = true;
        
        emit newUserEvent(msg.sender, userName, now);
        return true;
    }

    // 刪除用戶
    function deleteUser() public returns (bool) {
        if(!isUser(msg.sender)) revert();
        userStructs[msg.sender].isUser = false;
        
        emit deleteUserEvent(msg.sender, userStructs[msg.sender].userName, now);
        return true;
    }
    
    // 更新用戶資訊
    function updateUser(string memory userPwd) public returns(bool success) {
        if(!isUser(msg.sender)) revert();
        userStructs[msg.sender].userPwd = userPwd;
        
        emit updateUserEvent(msg.sender, userStructs[msg.sender].userName, now);
        return true;
    }
    
    // 登入
    function Login(string memory userName, string memory userPwd) public returns (bool) {
        if(keccak256(abi.encodePacked(userStructs[msg.sender].userName)) == keccak256(abi.encodePacked(userName)))
            if(keccak256(abi.encodePacked(userStructs[msg.sender].userPwd)) == keccak256(abi.encodePacked(userPwd))){
                emit LoginEvent(msg.sender, userName, now);
                return true;
            }
        return false;
    }
}