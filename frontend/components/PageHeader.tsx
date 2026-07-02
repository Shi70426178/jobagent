interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="mb-6 md:mb-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-sm md:text-base text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}