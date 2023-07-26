
function Table({bills}) {
    // const [bills, setBills] = useState([])
    // useEffect(function(){
    //     async function fetchBills() {
    //         const res = await fetch('http://127.0.0.1:9292/friends/'+friendId);
    //         const data = await res.json();
    //         setBills(data);
    //       }
      
    //       fetchBills();
    // },[friendId]);

    console.log (bills)
  return (
    <table className="table-auto">
        <thead>
            <tr>
                <th>Date</th>
                <th>Bill Amount</th>
                <th>Balance</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
      {bills?.map(bill => (
          <tr key={bill.id}>
          <td>{bill.bill_date}</td>
          <td>{bill.bill_amount}</td>
          <td>{bill.balance}</td>
          <td>
            <button>Delete</button>
          </td>
      </tr>
      ))}
        </tbody>
    </table>
  )
}

export default Table