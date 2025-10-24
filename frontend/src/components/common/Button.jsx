const Button = ({ onClick, children, isLoading }) => {
  return (
    <button
      onClick={onClick}
      className={` px-4 py-2 rounded-lg text-white font-semibold ${
        isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
