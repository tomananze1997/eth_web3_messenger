// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Messenger {
    struct User {
        uint256 id;
        uint256[] chatsId;
        string username;
        address userAddress;
    }

    struct Message {
        uint256 id;
        User owner;
        string text;
        uint256 changedAt;
        bool isChanged;
    }

    struct Chat {
        uint256 id;
        string chatName;
        uint256[] usersId;
        uint256[] messagesId;
    }

    mapping(string => bool) private _isUsernameTaken;
    mapping(string => bool) private _isChatNameTaken;

    uint256 private _numberOfUsers;
    uint256 private _numberOfChats;
    uint256 private _numberOfMessages;

    User[] private _userArray;
    Chat[] private _chatArray;
    Message[] private _messageArray;

    //EVENTS============================================

    event UsersChanged();
    event ChatsChanged();
    event MessagesChanged();

    event newMessageEvent(
        address senderAddress,
        string senderUsername,
        string message
    );
    event newChatEvent(
        address senderAddress,
        string senderUsername,
        string chatName
    );

    //USER==============================================

    function doesUserExist() public view returns (bool) {
        for (uint256 i = 0; i < _userArray.length; i++) {
            if (_userArray[i].userAddress == msg.sender) {
                return true;
            }
        }

        return false;
    }

    function createUser(string memory username) external {
        require(!_isUsernameTaken[username], 'This username is already taken');
        require(!doesUserExist(), 'User already exists!');
        require(bytes(username).length != 0, 'username should exist!');

        _userArray.push(
            User({
        id : _numberOfUsers,
        chatsId : new uint256[](0),
        username : username,
        userAddress : msg.sender
        })
        );

        _isUsernameTaken[username] = true;

        _numberOfUsers++;

        emit UsersChanged();
    }

    function getCurrentUser() external view returns (User memory) {
        uint256 senderId = _getUserIdByAddress();

        return _userArray[senderId];
    }

    function getAllUsers() external view returns (User[] memory) {
        return _userArray;
    }

    //CHAT==============================================

    function createChat(string memory chatName) external {
        require(bytes(chatName).length != 0, 'Text should exist!');
        require(!_isChatNameTaken[chatName], 'This chat name is already taken');

        uint256 senderId = _getUserIdByAddress();

        _chatArray.push(
            Chat({
        id : _numberOfChats,
        chatName : chatName,
        usersId : new uint256[](0),
        messagesId : new uint256[](0)
        })
        );

        _chatArray[_numberOfChats].usersId.push(senderId);
        _userArray[senderId].chatsId.push(_numberOfChats);

        _isChatNameTaken[chatName] = true;

        _numberOfChats++;

        emit ChatsChanged();
    }

    function addUsersToChat(uint256 chatId, uint256[] memory newUsersId)
    external
    {
        uint256 senderId = _getUserIdByAddress();
        bool isAnyUserAdded = false;

        require(_chatArray.length > chatId, 'Chat does not exist!');
        require(
            _isIndexInArray(_chatArray[chatId].usersId, senderId),
            'Sender must be must be in chat, or chat was deleted!'
        );

        //check if newUserId array is valid
        for (uint256 i = 0; i < newUsersId.length; i++) {
            bool isUserFound = false;

            for (uint256 j = 0; j < _userArray.length; j++) {
                if (newUsersId[i] == _userArray[j].id) {
                    isUserFound = true;
                }
            }

            require(isUserFound, 'User id is not found!');
            isUserFound = false;
        }

        for (uint256 i = 0; i < newUsersId.length; i++) {
            bool isUserInChat = _isIndexInArray(
                _chatArray[chatId].usersId,
                newUsersId[i]
            );

            if (!isUserInChat) {
                _chatArray[chatId].usersId.push(newUsersId[i]);
                _userArray[newUsersId[i]].chatsId.push(chatId);

                isAnyUserAdded = true;
            }
        }

        if (!isAnyUserAdded) {
            revert('All users are already in chat!');
        }

        emit UsersChanged();
        emit ChatsChanged();
        emit newChatEvent(
            msg.sender,
            _userArray[senderId].username,
            _chatArray[chatId].chatName
        );
    }

    function getChat(uint256 chatId) external view returns (Chat memory) {
        uint256 senderId = _getUserIdByAddress();

        require(_chatArray.length > chatId, 'Chat does not exist!');
        require(
            _isIndexInArray(_chatArray[chatId].usersId, senderId),
            'Sender must be must be in chat, or chat was deleted!'
        );

        return _chatArray[chatId];
    }

    function getAllUserChats() external view returns (Chat[] memory) {
        uint256 senderId = _getUserIdByAddress();

        Chat[] memory newUserChats = new Chat[](
            _userArray[senderId].chatsId.length
        );
        uint256 userChatsIdx;

        for (uint256 i = 0; i < _userArray[senderId].chatsId.length; i++) {
            newUserChats[userChatsIdx] = _chatArray[_userArray[senderId].chatsId[i]];
            userChatsIdx++;
        }

        return newUserChats;
    }

    function getAllUsersInChat(uint256 chatId)
    external
    view
    returns (User[] memory)
    {
        uint256 senderId = _getUserIdByAddress();

        require(_chatArray.length > chatId, 'Chat does not exist!');
        require(
            _isIndexInArray(_chatArray[chatId].usersId, senderId),
            'Sender must be must be in chat!'
        );

        User[] memory newUsers = new User[](_chatArray[chatId].usersId.length);
        uint256 userIdx;

        for (uint256 i = 0; i < _userArray.length; i++) {
            bool isUserInChat = _isIndexInArray(
                _chatArray[chatId].usersId,
                _userArray[i].id
            );

            if (isUserInChat) {
                newUsers[userIdx] = _userArray[i];
                userIdx++;
            }
        }

        return newUsers;
    }

    function leaveChat(uint256 chatId) external {
        uint256 senderId = _getUserIdByAddress();

        require(_chatArray.length > chatId, 'Chat does not exist!');
        require(
            _isIndexInArray(_chatArray[chatId].usersId, senderId),
            'Sender must be must be in chat!'
        );

        //Erase user from chat
        for (uint256 i; i < _chatArray[chatId].usersId.length; i++) {
            if (_chatArray[chatId].usersId[i] == senderId) {
                _chatArray[chatId].usersId[i] = _chatArray[chatId].usersId[
                _chatArray[chatId].usersId.length - 1
                ];
                _chatArray[chatId].usersId.pop();
            }
        }

        //Erase chat from user
        for (uint256 i; i < _userArray[senderId].chatsId.length; i++) {
            if (_userArray[senderId].chatsId[i] == chatId) {
                _userArray[senderId].chatsId[i] = _userArray[senderId].chatsId[
                _userArray[senderId].chatsId.length - 1
                ];
                _userArray[senderId].chatsId.pop();
            }
        }

        //Erease chat and messages if no users
        if (_chatArray[chatId].usersId.length == 0) {
            for (uint256 i; i < _messageArray.length; i++) {
                bool isMessageInChatsId = _isIndexInArray(
                    _chatArray[chatId].messagesId,
                    _messageArray[i].id
                );

                if (isMessageInChatsId) {
                    delete _messageArray[i];
                }
            }

            _isChatNameTaken[_chatArray[chatId].chatName] = false;
            delete _chatArray[chatId];

            emit MessagesChanged();
        }

        emit UsersChanged();
        emit ChatsChanged();
    }

    //MESSAGE===========================================

    function createMessage(uint256 chatId, string memory text) external {
        require(bytes(text).length != 0, 'Text should exist!');
        require(_chatArray.length > chatId, 'Chat does not exist!');

        uint256 senderId = _getUserIdByAddress();

        require(
            _isIndexInArray(_chatArray[chatId].usersId, senderId),
            'Sender must be must be in chat or chat was deleted!'
        );

        _messageArray.push(
            Message({
        id : _numberOfMessages,
        owner : _userArray[senderId],
        text : text,
        changedAt : block.timestamp,
        isChanged : false
        })
        );

        _chatArray[chatId].messagesId.push(_numberOfMessages);

        _numberOfMessages++;

        emit ChatsChanged();
        emit MessagesChanged();
        emit newMessageEvent(msg.sender, _userArray[senderId].username, text);
    }

    function changeMessage(uint256 messageId, string memory text) external {
        uint256 senderId = _getUserIdByAddress();

        require(_messageArray.length > messageId, 'Message does not exist!');
        require(
            senderId == _messageArray[messageId].owner.id,
            'Sender must be owner of the message or the message was deleted!'
        );
        require(bytes(text).length != 0, 'Text should exist!');

        _messageArray[messageId] = Message({
        id : _messageArray[messageId].id,
        text : text,
        changedAt : block.timestamp,
        owner : _messageArray[messageId].owner,
        isChanged : true
        });

        emit MessagesChanged();
    }

    function getAllMessagesInChat(uint256 chatId)
    external
    view
    returns (Message[] memory)
    {
        uint256 senderId = _getUserIdByAddress();

        require(_chatArray.length > chatId, 'Chat does not exist!');
        require(
            _isIndexInArray(_chatArray[chatId].usersId, senderId),
            'Sender must be must be in chat!'
        );

        Message[] memory newMessageArray = new Message[](
            _chatArray[chatId].messagesId.length
        );
        uint256 messagesIdx;

        for (uint256 i = 0; i < _messageArray.length; i++) {
            bool isMessageInChatsId = _isIndexInArray(
                _chatArray[chatId].messagesId,
                _messageArray[i].id
            );

            if (isMessageInChatsId) {
                newMessageArray[messagesIdx] = _messageArray[i];

                messagesIdx++;
            }
        }

        return newMessageArray;
    }

    function deleteMessage(uint256 messageId) external {
        require(_messageArray.length > messageId, 'Message does not exist!');

        delete _messageArray[messageId];

        emit MessagesChanged();
    }

    //UTILS=============================================

    function _getUserIdByAddress() private view returns (uint256) {
        for (uint256 i = 0; i < _userArray.length; i++) {
            if (_userArray[i].userAddress == msg.sender) {
                return _userArray[i].id;
            }
        }

        revert('User not found!');
    }

    function _isIndexInArray(uint256[] memory arr, uint256 searchedIdx)
    private
    pure
    returns (bool)
    {
        for (uint256 i = 0; i < arr.length; i++) {
            if (arr[i] == searchedIdx) {
                return true;
            }
        }

        return false;
    }
}
