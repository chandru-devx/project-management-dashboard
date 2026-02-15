const SectionHeader = ({ title, desc, action }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {desc && (
          <p className="text-sm text-gray-500 mt-1">{desc}</p>
        )}
      </div>
      {action}
    </div>
  );
};

export default SectionHeader;
