export default function FilterButton({
  filter,
  setFilter,
  filterName,
  filterIcon,
}) {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setFilter(filter)}
        className={`${
          filter === filterName ? "bg-gray-200" : "bg-white"
        } p-2 rounded-full shadow-md`}
      >
        {filterIcon}
      </button>
      <p className="text-xs">{filterName}</p>
    </div>
  );
}