import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [isEdit,setIsEdit] = useState(false)
  const changeAmount = (e) => {
    const value = e.target.value;
    const numberValue = parseInt(value);
    if (value == numberValue) {
      setAmount(numberValue);
    }
  };

  const addExpense = async () => {
    const response = await axios.post("http://127.0.0.1:8000/expense/track/", {
      amount: amount,
      desc: desc,
    });
    getExpenses();
    setAmount(0);
    setDesc("");
  };

  const deleteExpense = async (expenseId) => {
    const response = await axios.delete(
      `http://127.0.0.1:8000/expense/track/${expenseId}/`
    );
    console.log(response);
    getExpenses();
  };

  const editExpense = (expense) => {
    setAmount(expense.amount);
    setDesc(expense.description);
  };

  const getExpenses = async () => {
    const response = await axios.get("http://127.0.0.1:8000/expense/track/");
    setExpenses(response.data);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const total_expense = expenses?.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="bg-container flex flex-col items-center h-screen w-full -mt-20 bg-green-800">
      <h2 className="text-center text-2xl font-bold mb-4 text-white uppercase shadow-xl">
        Total Expense: {total_expense} INR
      </h2>
      <div className="flex gap-4 justify-between w-full max-w-4xl">
        <div className="expense-box p-6 font-serif mb-4 w-1/3 max-h-96">
          <h2 className="text-white text-lg font-bold mb-4">Add Expense</h2>
          <div className="mb-4">
            <label htmlFor="amount" className="text-white block mb-1">
              Enter Amount:
            </label>
            <input
              type="text"
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-red-300"
              id="amount"
              value={amount}
              onChange={changeAmount}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="text-white block mb-1">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              cols="20"
              value={desc}
              placeholder="Enter your description here"
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-red-300"
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-black text-green-500 font-bold py-2 rounded hover:bg-gray-200 transition"
            onClick={addExpense}
          >
            Add Expense
          </button>
        </div>
        <div className="expense-box p-4 mb-4 w-2/3">
          <h2 className="text-white text-lg font-bold mb-4">Expense List</h2>
          {expenses.length === 0 ? (
            <p className="text-center">No expenses tracked yet.</p>
          ) : (
            expenses.map((expense) => (
              <div className="expense-box mt-3 rounded p-5" key={expense.id}>
                <div className="font-serif">
                  <div className="flex justify-between mb-2 text-white">
                    <div>Amount: {expense.amount} INR</div>
                    <div>Description: {expense.description}</div>
                  </div>
                  <div className="flex justify-between">
                    <button
                      className="p-2 px-5 bg-green-600 rounded-md hover:bg-green-700"
                      onClick={() => editExpense(expense)}
                    >
                      Edit
                    </button>
                    <button
                      className="p-2 px-5 bg-green-600 rounded-md hover:bg-green-700"
                      onClick={() => deleteExpense(expense.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
