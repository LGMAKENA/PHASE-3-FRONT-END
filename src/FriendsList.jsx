import Friend from './Friend';

function FriendsList({ friends, setSelectedFriend, setDisplayAddForm }) {
  return (
    <div className="friends-list">
      {friends?.map((friend, index) => (
        <Friend
          key={friend.id}
          index={index + 1}
          id={friend.id}
          img={friend.avatar}
          name={friend.full_name}
          balance={friend.balance}
          setDisplayAddForm={setDisplayAddForm}
          setSelectedFriend={setSelectedFriend}
        />
      ))}
    </div>
  );
}

export default FriendsList;
