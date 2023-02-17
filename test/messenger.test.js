const Messenger = artifacts.require('Messenger');

contract('Messenger', (accounts) => {
  let instance;
  const usernames = [
    'John',
    'Jane',
    'Bob',
    'Arthur',
    'Kevin',
    'Kyrie',
    'Barbie',
    'Bruce'
  ];
  before(async () => {
    instance = await Messenger.deployed();
  });

  describe('doesUserExist', () => {
    it('should return FALSE when user does not exist', async () => {
      const result = await instance.doesUserExist({ from: accounts[0] });

      assert.equal(result, false);
    });

    it('should return TRUE when user exist', async () => {
      await instance.createUser(usernames[0], { from: accounts[0] });
      const result = await instance.doesUserExist({ from: accounts[0] });

      assert.equal(result, true);
    });
  });

  describe('createUser', () => {
    it('should add a new user to the _userArray', async () => {
      await instance.createUser(usernames[1], { from: accounts[1] });
      const user = await instance.getCurrentUser({ from: accounts[1] });

      assert.equal(user.username, usernames[1]);
    });

    it('should emit a UsersChanged event', async () => {
      const tx = await instance.createUser(usernames[2], { from: accounts[2] });

      assert.equal(tx.logs[0].event, 'UsersChanged');
    });

    it('should not allow duplicate usernames', async () => {
      await instance.createUser(usernames[3], { from: accounts[3] });

      try {
        await instance.createUser(usernames[3], { from: accounts[3] });
        assert.fail('Expected an error but did not receive one');
      } catch (err) {
        assert(err.message.includes('This username is already taken'));
      }
    });

    it('should not allow creating multiple users with the same address', async () => {
      await instance.createUser(usernames[4], { from: accounts[4] });

      try {
        await instance.createUser(usernames[5], { from: accounts[4] });
        assert.fail('Expected an error but did not receive one');
      } catch (err) {
        assert(err.message.includes('User already exists!'));
      }
    });

    it('should require a non-empty username', async () => {
      try {
        await instance.createUser('', { from: accounts[5] });
        assert.fail('Expected an error but did not receive one');
      } catch (err) {
        assert(err.message.includes('username should exist!'));
      }
    });
  });

  describe('getCurrentUser', () => {
    it('should return the current user', async () => {
      await instance.createUser(usernames[5], { from: accounts[5] });
      const user = await instance.getCurrentUser({ from: accounts[5] });

      assert.equal(user.username, usernames[5]);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      await instance.createUser(usernames[6], { from: accounts[6] });
      await instance.createUser(usernames[7], { from: accounts[7] });
      const users = await instance.getAllUsers({ from: accounts[7] });

      assert.equal(users.length, 8);
    });
  });
});
