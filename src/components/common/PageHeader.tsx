interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <header className="space-y-2">
      <h1 className="text-2xl font-display font-bold tracking-tight md:text-3xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="max-w-xl text-sm text-muted-foreground md:text-base">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
};

export default PageHeader;
