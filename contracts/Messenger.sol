// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Messenger {
    struct User {
        uint256 id;
        uint256[] chatsId;
        bytes32 username;
        address userAddress;
    }

    struct Message {
        uint256 id;
        User owner;
        bytes32 text;
        uint256 changedAt;
        bool isChanged;
    }

    struct Chat {
        uint256 id;
        bytes32 chatName;
        User[] users;
        Message[] messages;
    }

    mapping(bytes32 => bool) public isUsernameTaken;
    mapping(bytes32 => bool) public isChatNameTaken;

    uint256 private numberOfUsers;
    uint256 private numberOfChats;
    Chat[] public chatArray;
    User[] public userArray;

    //USER==============================================

    function createUser(bytes32 username) external {
        require(!isUsernameTaken[username], 'This username is already taken');

        userArray.push(User({
        id : numberOfUsers,
        chatsId : new uint256[](0),
        username : username,
        userAddress : msg.sender
        }));

        numberOfUsers++;
    }

    function getAllUsers() external view returns (User[] memory){
        return userArray;
    }

    //CHAT==============================================

    function createChat(bytes32 chatName) external {
        require(!isChatNameTaken[chatName], 'This chat name is already taken');
        uint256 senderId = getUserIdByAddress();

        // User[] memory userArray= new User[](0);
        // Message[] memory messageArray= new Message[](0);

        chatArray.push(Chat({
        id : numberOfChats,
        chatName : chatName,
        users : new User[](0),
        messages : new Message[](0)
        }));

        chatArray[numberOfChats].users.push(userArray[senderId]);

        numberOfChats++;
    }

    function addUsersToChat(uint256 chatId, uint256[] calldata newUsersId) external {

        for (uint256 i = 0; i < chatArray[chatId].users.length; i++) {

            for (uint256 j = 0; j < newUsersId.length; j++) {

                if (chatArray[chatId].users[i].id != newUsersId[j]) {
                    chatArray[chatId].users.push(userArray[newUsersId[j]]);
                }

            }

        }

    }

    function getChat(uint256 chatId) external view returns (Chat memory){
        require(chatArray.length > chatId, 'Chat does not exist!');

        return chatArray[chatId];
    }

    function getAllUserChats() external view returns (Chat[] memory){
        uint256 senderId = getUserIdByAddress();

        Chat[] memory userChats = new Chat[](0);
        uint256 userChatsIdx;

        for (uint256 i; i < chatArray.length; i++) {

            for (uint256 j; j < userArray[senderId].chatsId.length; j++) {

                if (chatArray[i].id == userArray[senderId].chatsId[j]) {
                    userChats[userChatsIdx] = chatArray[i];

                    userChatsIdx++;
                }

            }

        }

        return userChats;
    }

    function leaveChat(uint256 chatId) external {
        uint256 senderId = getUserIdByAddress();

        //Erase user from chat
        for (uint256 i; i < chatArray[chatId].users.length; i++) {

            if (chatArray[chatId].users[i].id == senderId) {
                chatArray[chatId].users[i] = chatArray[chatId].users[chatArray[chatId].users.length - 1];
                chatArray[chatId].users.pop();
            }

        }
        //Erase chat from user
        for (uint256 i; i < userArray[senderId].chatsId.length; i++) {

            if (userArray[senderId].chatsId[i] == chatId) {
                userArray[senderId].chatsId[i] = userArray[senderId].chatsId[userArray[senderId].chatsId.length - 1];
                userArray[senderId].chatsId.pop();
            }

        }
    }

    //MESSAGE===========================================

    function createMessage(uint256 chatId, bytes32 text) external {
        require(text != '', 'Text should exist!');

        uint256 senderId = getUserIdByAddress();

        chatArray[chatId].messages.push(Message({
        id : chatArray[chatId].messages.length,
        owner : userArray[senderId],
        text : text,
        changedAt : block.timestamp,
        isChanged : false
        }));
    }

    function changeMessage(uint256 chatId, uint256 messageId, bytes32 text) external {
        uint256 senderId = getUserIdByAddress();

        require(senderId != chatArray[chatId].messages[messageId].owner.id, 'Sender must be owner of the message!');
        require(text != '', 'Text should exist!');

        for (uint256 i = 0; i < chatArray[chatId].messages.length; i++) {

            if (chatArray[chatId].messages[i].id == messageId) {

                chatArray[chatId].messages[i] = Message({
                id : chatArray[chatId].messages[i].id,
                text : text,
                changedAt : block.timestamp,
                owner : chatArray[chatId].messages[i].owner,
                isChanged : true
                });

            }

        }

    }

    function deleteMessage(uint256 chatId, uint256 messageId) external {
        uint256 senderId = getUserIdByAddress();

        require(senderId != chatArray[chatId].messages[messageId].owner.id, 'Sender must be owner of the message!');

        delete chatArray[messageId].messages[messageId];
    }

    //UTILS=============================================

    function getUserIdByAddress() private view returns (uint256){

        for (uint256 i = 0; i < userArray.length; i++) {

            if (userArray[i].userAddress == msg.sender) {
                return userArray[i].id;
            }

        }
    }
}
