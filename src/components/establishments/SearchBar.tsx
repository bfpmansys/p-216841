
interface SearchBarProps {
    onSearch: (value: string) => void;
  }
  
  export const SearchBar = ({ onSearch }: SearchBarProps) => {
    return (
      <div className="flex justify-end p-5 max-sm:p-3">
        <div className="flex items-center w-[590px] bg-white p-2.5 rounded-[7px] border border-gray-200 shadow-sm transition-all max-lg:w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/04eabecb3d2e31b1a728997bcaa96b57b0fc6006"
            alt="Search"
            className="w-[18px] h-[18px] mr-2.5 opacity-60"
          />
          <input
            type="text"
            placeholder="Search establishment or inspection number"
            onChange={(e) => onSearch(e.target.value)}
            className="w-full text-base text-gray-700 font-medium border-none outline-none placeholder:text-gray-400"
          />
        </div>
      </div>
    );
  };