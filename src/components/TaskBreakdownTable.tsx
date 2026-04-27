import { AnalyzedTask } from "@/lib/types";

export function TaskBreakdownTable({ tasks }: { tasks: AnalyzedTask[] }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="mb-4 text-xl font-semibold text-white">Task Breakdown</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="pb-2">Task</th>
              <th className="pb-2">AI Risk</th>
              <th className="pb-2">Score</th>
              <th className="pb-2">Reason</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.task} className="border-t border-slate-800 align-top text-slate-200">
                <td className="py-3 pr-3 font-medium text-white">{task.task}</td>
                <td className="py-3 pr-3">{task.risk_level}</td>
                <td className="py-3 pr-3">{task.risk_percentage}%</td>
                <td className="py-3">{task.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
