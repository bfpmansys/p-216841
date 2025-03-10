interface LegendItemProps {
  color: string;
  label: string;
}

const LegendItem = ({ color, label }: LegendItemProps) => (
  <div className="flex items-center gap-4 text-base md:text-2xl text-black font-medium mt-3.5">
    <div
      className={`bg-[${color}] w-[30px] h-[30px] md:w-[39px] md:h-[37px] rounded-[50%]`}
    />
    <div>{label}</div>
  </div>
);

export const MonthlyChart = () => {
  return (
    <section className="mt-10 md:mt-[58px] w-full">
      <h2 className="text-black text-xl md:text-2xl font-semibold text-center max-md:max-w-full">
        TOTAL INSPECTIONS FOR THE MONTH
      </h2>
      <div className="w-full mt-5 md:mt-[45px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/605c382ffc624f65b1b13358f5877fd8/4c755930cc8489d9c0ff85a725840947cb227631a6090338cb93bf51cfcde9af?placeholderIfAbsent=true"
          alt="Monthly Inspections Chart"
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="mt-5 md:mt-8 flex flex-col md:flex-row md:justify-center md:gap-10">
        <LegendItem color="rgba(242,124,34,1)" label="Priority Inspections" />
        <LegendItem
          color="rgba(255,189,89,1)"
          label="Assigned Establishments"
        />
      </div>
    </section>
  );
};
