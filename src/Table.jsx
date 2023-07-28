function Table({ bills, setSelectedFriend }) {
  async function deleteHandler(id) {
    const res = await fetch('http://127.0.0.1:9292/bills/' + id, {
      method: 'DELETE',
    });

    if (!res.ok) return;
    setSelectedFriend();
    window.location.reload ()
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Bill Date</th>
          <th>Bill Amount</th>
          <th>Balance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bills?.map(bill => (
          <tr key={bill.id}>
            <th>{bill.bill_date}</th>
            <th>{bill.bill_amount}</th>
            <th>{bill.balance}</th>
            <th>
              <button onClick={() => deleteHandler(bill.id)}>Delete</button>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;