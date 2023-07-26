import { useState } from 'react';

function AddFriendForm({ setDisplayAddForm, setFriends, setSelectedFriend }) {
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState('https://i.pravatar.cc/48');

  const onClose = () => {
    setFullName('');
    setAvatar('https://i.pravatar.cc/48');
    setDisplayAddForm(false);
    setSelectedFriend();
  };

  const onSubmit = e => {
    e.preventDefault();
    if (
      fullName.toString().trim().length === 0 ||
      avatar.toString().trim().length === 0
    ) {
      alert('Fill all required details');
      return;
    }

    const formObj = {
      full_name: fullName,
      avatar: `https://i.pravatar.cc/48?=${new Date().toISOString()}`,
    };

    try {
      setIsLoading(true);
      fetch('http://127.0.0.1:9292/friends', {
        method: 'POST',
        body: JSON.stringify(formObj),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          setFriends(prevFriends => [...prevFriends, data]);
          onClose();
        });
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="avatar">Avatar</label>
        <input
          type="text"
          name="avatar"
          id="avatar"
          value={avatar}
          onChange={e => setAvatar(e.target.value)}
          readOnly
        />
      </div>
      <div className="actions">
        <button className="btn primary" disabled={isLoading}>
          Add
        </button>
        <button
          className="btn secondary"
          disabled={isLoading}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </form>
  );
}

export default AddFriendForm;
