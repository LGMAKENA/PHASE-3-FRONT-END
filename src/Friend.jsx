function Friend({
  img,
  name,
  balance,
  index,
  setSelectedFriend,
  setDisplayAddForm,
  id,
}) {
  const onFriendClick = () => {
    setDisplayAddForm(false);
    setSelectedFriend({ name, img, balance, id });
  };
  return (
    <div
      className={`friend ${index % 2 === 0 ? 'even' : ''}`}
      onClick={onFriendClick}
    >
      <img src={img} alt={name} />
      <div>
        <p className="name">{name}</p>
        {balance === 0 && (
          <p>{`You and ${name} don't owe each other anything`}</p>
        )}
        {balance > 0 && (
          <p className="positive">{`${name} owes you Ksh. ${balance}`}</p>
        )}
        {balance < 0 && (
          <p className="negative">{`You owe ${name} Ksh. ${balance * -1}`}</p>
        )}
      </div>
    </div>
  );
}

export default Friend;
