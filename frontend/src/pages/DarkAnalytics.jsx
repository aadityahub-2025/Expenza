export default function DarkAnalytics() {
  return (
    <div className="p-8 text-white bg-[#0b1220] rounded-2xl min-h-[80vh] space-y-6">
      
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#151f38] p-4 rounded-xl shadow-lg border border-slate-700">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Income</p>
          <h2 className="text-2xl font-bold text-green-400">₹85,000</h2>
        </div>
        <div className="bg-[#151f38] p-4 rounded-xl shadow-lg border border-slate-700">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Expense</p>
          <h2 className="text-2xl font-bold text-red-400">₹3,149</h2>
        </div>
        <div className="bg-[#151f38] p-4 rounded-xl shadow-lg border border-slate-700 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Savings</p>
            <h2 className="text-2xl font-bold text-blue-400">₹81,851</h2>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Savings %</p>
            <h2 className="text-2xl font-bold text-purple-400">96.3%</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#151f38] p-6 rounded-xl shadow-lg border border-slate-700 min-h-[250px]">
          <h3 className="text-sm font-bold mb-4">Expense Categories</h3>
          <div className="flex items-center justify-center h-full text-slate-500">Pie Chart Placeholder</div>
        </div>
        <div className="bg-[#151f38] p-6 rounded-xl shadow-lg border border-slate-700 min-h-[250px]">
          <h3 className="text-sm font-bold mb-4">Monthly Expenses</h3>
          <div className="flex items-center justify-center h-full text-slate-500">Bar Chart Placeholder</div>
        </div>
      </div>

      <div className="bg-[#151f38] p-6 rounded-xl shadow-lg border border-slate-700 min-h-[250px]">
        <h3 className="text-sm font-bold mb-4">Expense Trend</h3>
        <div className="flex items-center justify-center h-full text-slate-500">Line Chart Placeholder</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#151f38] p-6 rounded-xl shadow-lg border border-slate-700">
          <h3 className="text-sm font-bold mb-4">AI Insights</h3>
          <p className="text-xs text-gray-400">Highest Spending Category</p>
          <h2 className="text-xl font-bold text-red-400">Food</h2>
          <p className="text-sm">₹2,500</p>
        </div>
        <div className="bg-[#151f38] p-6 rounded-xl shadow-lg border border-slate-700">
          <h3 className="text-sm font-bold mb-4">Financial Health</h3>
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Expense Ratio</span>
              <span>3.7%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full">
              <div className="bg-red-400 h-2 rounded-full" style={{ width: "3.7%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Savings Ratio</span>
              <span>96.3%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: "96.3%" }}></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
