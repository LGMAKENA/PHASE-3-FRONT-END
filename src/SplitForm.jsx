import { useState } from 'react';

function getFirstNameOnly(str) {
  return str.split(' ').at(0);
}
const initialState = {
  amount: '',
  yourExpense: '',
  friendExpense: '',
  whosPaying: '',
  billDate: new Date(),
};

function SplitForm({ selectedFriend, setFriends, setSelectedFriend }) {
  const isLoading = false;
  const [formFields, setFormFields] = useState(initialState);

  const onChange = e => {
    const { name, value } = e.target;
    setFormFields(prevFields => {
      return {
        ...prevFields,
        [name]: value,
      };
    });
  };

  const calculate = () => {
    if (formFields.amount.length === 0 || formFields.yourExpense.length === 0)
      return;
    if (parseFloat(formFields.yourExpense) > parseFloat(formFields.amount)) {
      alert('You cannot pay more than bill value');
      return;
    }

    const friendExpense =
      parseFloat(formFields.amount) - parseFloat(formFields.yourExpense);
    setFormFields(prevFields => {
      return { ...prevFields, friendExpense };
    });
  };

  const onClose = () => {
    setFormFields(initialState);
    setSelectedFriend();
  };

  const onSubmit = e => {
    e.preventDefault();
    if (
      formFields.amount.length === 0 ||
      formFields.yourExpense.length === 0 ||
      formFields.billDate === '' ||
      formFields.whosPaying === ''
    ) {
      alert('Fill all required fields');
      return;
    }

    const formObj = {
      bill_date: new Date(formFields.billDate),
      friend_id: selectedFriend.id,
      bill_amount: parseFloat(formFields.amount),
      amount_paid: 0,
      who_paid: +formFields.whosPaying,
      balance:
        +formFields.whosPaying === 1
          ? parseFloat(formFields.friendExpense)
          : parseFloat(formFields.yourExpense) * -1,
    };

    fetch('http://127.0.0.1:9292/bills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formObj),
    })
      .then(res => res.json())
      .then(() => {
        setFriends(prevFriends => {
          const friend = prevFriends.find(
            frnd => frnd.id === selectedFriend.id
          );
          const friends = prevFriends.filter(
            friend => friend.id !== selectedFriend.id
          );
          friend.balance = friend.balance + formObj.balance;
          return [...friends, friend].sort((a, b) => a.id - b.id);
        });

        onClose();
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <h4>Spilt a bill with {selectedFriend?.name}</h4>
      <div className="form-row">
        <label htmlFor="amount">💰 Bill Value</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={formFields.at}
          onChange={onChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="yourExpense">💲Your Expense</label>
        <input
          type="number"
          name="yourExpense"
          id="yourExpense"
          value={formFields.yourExpense}
          onChange={onChange}
          onBlur={calculate}
        />
      </div>
      <div className="form-row">
        <label htmlFor="friendExpense">
          {getFirstNameOnly(selectedFriend?.name)}&apos;s Expense
        </label>
        <input
          type="text"
          name="friendExpense"
          id="friendExpense"
          value={formFields.friendExpense}
          onChange={onChange}
          readOnly
        />
      </div>
      <div className="form-row">
        <label htmlFor="whosPaying">💁‍♀️ Who&apos;s paying</label>
        <select
          name="whosPaying"
          id="whosPaying"
          value={formFields.whosPaying}
          onChange={onChange}
        >
          <option value="" disabled>
            Select who paid
          </option>
          <option value="1">You</option>
          <option value="2">{selectedFriend?.name}</option>
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="friendExpense">Bill Date</label>
        <input
          type="date"
          name="billDate"
          id="billDate"
          value={formFields.billDate}
          onChange={onChange}
        />
      </div>
      <div className="actions">
        <button className="btn primary" disabled={isLoading}>
          Split Bill
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

export default SplitForm;
