import { useEffect, useState } from 'react';
import FriendsList from './FriendsList';
import AddFriendForm from './AddFriendForm';
import SplitForm from './SplitForm';
import Table from './Table';

function App() {
  const [friends, setFriends] = useState([]);
  const [displayAddForm, setDisplayAddForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState();
  const [bills, setBills] = useState([])
  
  useEffect(function () {
    async function fetchFriends() {
      const res = await fetch('http://127.0.0.1:9292/friends');
      const data = await res.json();
      setFriends(data);
    }

    fetchFriends();
  }, []);
  
  
  useEffect(function(){
    async function fetchBills() {
    if( selectedFriend){
        const res = await fetch('http://127.0.0.1:9292/friends/'+selectedFriend.id);
        const data = await res.json();
        setBills(data);
      }
    }
    fetchBills();
    
  },[selectedFriend])


  const onShowForm = () => {
    setSelectedFriend();
    setDisplayAddForm(true);
  };
  return (
    <div className="app">
      <h1>
        Hang & <span>Split</span>
      </h1>
      {!displayAddForm && (
        <button className="btn primary" onClick={onShowForm}>
          Add Friend
        </button>
      )}
      <div className="wrapper">
        <FriendsList
          friends={friends}
          setDisplayAddForm={setDisplayAddForm}
          setSelectedFriend={setSelectedFriend}
        />
        {displayAddForm && (
          <AddFriendForm
            setDisplayAddForm={setDisplayAddForm}
            setFriends={setFriends}
            setSelectedFriend={setSelectedFriend}
          />
        )}

        {!displayAddForm && selectedFriend && (
          <SplitForm
            selectedFriend={selectedFriend}
            friends={friends}
            setFriends={setFriends}
            setSelectedFriend={setSelectedFriend}
          />
        )}
      </div>
    {!displayAddForm && selectedFriend &&   <Table bills={bills}/>}

    </div>
  );
}

export default App;
