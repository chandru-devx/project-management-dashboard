const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

