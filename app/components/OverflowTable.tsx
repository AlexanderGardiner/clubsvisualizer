import React from "react";

const OverflowTable = ({ items }: { items: string[][] }) => {
  let updatedItems: string[][] = [];
  for (let i = 0; i < items.length - Math.floor(items.length / 2); i++) {
    updatedItems.push(items[i]);
    updatedItems.push(items[i + Math.ceil(items.length / 2)]);
  }

  return (
    <div className="mx-10 h-9/10">
      <div className="grid grid-cols-2 gap-4 gap-x-8 h-5/6">
        {updatedItems.map((cell: string[], index: number) => (
          <div
            key={index}
            className="flex flex-col items-center min-h-24 max-h-24"
          >
            <div className={`w-full ${index < 2 ? "invisible" : ""} mb-4`}>
              <hr className="h-1 bg-dphsGold border-0 w-full" />
            </div>
            <div className="grid grid-cols-10 w-full">
              <h4 className="text-4xl col-span-7 text-dphsGold font-montserrat font-bold">
                {cell ? cell[0] : null}
              </h4>
              <h4 className="text-2xl text-right col-span-3 text-dphsGold font-montserrat font-bold">
                {cell ? cell[1] + " " + cell[2] : null}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverflowTable;
