// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Messenger {
    struct User {
        uint256 id;
        bytes32 username;
        bool isSet;
    }

    struct Message {
        uint256 id;
        bytes32 text;
        uint256 changedAt;
        User owner;
        bool isChanged;
    }

    mapping(bytes32 => User) public users;
    mapping(bytes32 => bool) public isTaken;

    uint256 private numberOfCreatedMessages;
    uint256 private numberOfUsers;
    bool private isStopped = false;
    Message[] public messageArray;

    function addUser(bytes32 username) external {
        require(!isTaken[username], 'This username is already taken');
        bytes32 hashedAddress = keccak256(abi.encodePacked(msg.sender));

        users[hashedAddress] = User({
        id : numberOfUsers,
        username : username,
        isSet : true
        });

        numberOfUsers++;
    }

    function addMessage(bytes32 text) external {
        bytes32 hashedAddress = keccak256(abi.encodePacked(msg.sender));

        messageArray.push(Message({
        id : numberOfCreatedMessages,
        text : text,
        changedAt : block.timestamp,
        owner : users[hashedAddress],
        isChanged : false
        }));

        numberOfCreatedMessages++;
    }

    function changeMessage(uint256 messageId, bytes32 text) external {
        Message memory message = messageArray[messageId];
        bytes32 hashedAddress = keccak256(abi.encodePacked(msg.sender));
        require(users[hashedAddress].id != message.owner.id, 'Sender must be owner of the message!');

        messageArray[messageId] = Message({
        id : message.id,
        text : text,
        changedAt : block.timestamp,
        owner : message.owner,
        isChanged : true
        });
    }

    function deleteMessage(uint256 messageId) external {
        Message memory message = messageArray[messageId];
        bytes32 hashedAddress = keccak256(abi.encodePacked(msg.sender));
        require(users[hashedAddress].id != message.owner.id, 'Sender must be owner of the message!');

        delete messageArray[messageId];
    }

    function getAllMessages() external view returns (Message[] memory){
        return messageArray;
    }

    function getNumberOfCurrentUsers() external view returns (uint256){
        return numberOfUsers;
    }
}
