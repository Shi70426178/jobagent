interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
}: StatsCardProps) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-md">
      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2 text-white">
        {value}
      </h2>

      {subtitle && (
        <p className="text-slate-500 text-sm mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}