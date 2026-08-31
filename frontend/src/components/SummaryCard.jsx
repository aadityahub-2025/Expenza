export default function SummaryCard({
  title,
  value,
  valueColor = "text-slate-800 dark:text-slate-100"
}) {
  return (
    <div className="relative overflow-hidden bg-white/70 dark:bg-[#1f2937]/70 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900 group cursor-default">
      
      {/* Decorative Bubble Background */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-full blur-xl group-hover:scale-150 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-all duration-500"></div>

      <div className="relative z-10">
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
          {title}
        </p>
        <h2 className={`text-3xl font-extrabold tracking-tight ${valueColor} drop-shadow-sm`}>
          {value}
        </h2>
      </div>
    </div>
  );
}