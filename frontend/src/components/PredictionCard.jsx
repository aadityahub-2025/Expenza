import { FaBrain, FaArrowTrendUp } from "react-icons/fa6";

export default function PredictionCard() {
  return (
    <div className="bg-[#151f38] rounded-2xl p-6 shadow-lg border border-slate-700">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-white">
          AI Prediction
        </h2>

        <FaBrain className="text-purple-400 text-3xl" />
      </div>

      <h1 className="text-5xl font-bold text-green-400">
        ₹31,500
      </h1>

      <p className="text-gray-400 mt-3">
        Predicted expense for next month
      </p>

      <div className="mt-6 flex items-center gap-2 text-green-400">
        <FaArrowTrendUp />
        <span>92% Prediction Accuracy</span>
      </div>
    </div>
  );
}