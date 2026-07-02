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
    <div
      className="
      rounded-xl
      border
      border-slate-700
      bg-slate-800
      p-4
      md:p-5
      shadow-md
      w-full
    "
    >
      <p className="text-xs md:text-sm text-slate-400">
        {title}
      </p>

      <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white break-words">
        {value}
      </h2>

      {subtitle && (
        <p className="mt-2 text-xs md:text-sm text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}