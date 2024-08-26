"use client";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import OverflowTable from "./components/OverflowTable";

type StructuredData = string[];

let days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const fetchData = async (): Promise<StructuredData[]> => {
  const csvUrl =
    "https://docs.google.com/spreadsheets/d/10YpRo5GB6S6XutHrw3xdctCj7Wb-rjg01rEM5OixVEw/export?format=csv";
  try {
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let data = await response.text();
    data.slice(7);
    const parsed = Papa.parse<string[]>(data, {
      header: false,
      skipEmptyLines: true,
    });

    const rows: string[][] = parsed.data as string[][];
    let updatedData: StructuredData[] = [];

    for (let i = 0; i < rows.length; i++) {
      let date = new Date();
      let day = date.getDay();
      if (
        rows[i][1].toLowerCase().includes(days[day + 2]) &&
        rows[i][rows[i].length - 1] == "Valid"
      ) {
        updatedData.push([rows[i][0], rows[i][2], rows[i][3]]);
      }
    }
    let alreadyAdded: string[] = [];

    let uniqueData: string[][] = [];

    for (let i = 0; i < updatedData.length; i++) {
      if (!alreadyAdded.includes(updatedData[i][0].toLowerCase())) {
        uniqueData.push(updatedData[i]);
        alreadyAdded.push(updatedData[i][0].toLowerCase());
      }
    }

    return uniqueData;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return [];
  }
};

const HomePage: React.FC = () => {
  const [data, setData] = useState<StructuredData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const rows = await fetchData();
      setData(rows);
    };

    loadData();
  }, []);

  return (
    <div className="bg-dphsDarkBlue mt-0 py-10 w-[1920px] h-[1080px]">
      <div className="bg-dphsGold w-min p-4 ml-10 mb-10">
        <h1 className="font-montserrat text-8xl font-bold text-dphsDarkBlue whitespace-nowrap">
          {toUpperCamelCase(days[new Date().getDay() + 4]) + "'s Clubs"}
        </h1>
      </div>
      <OverflowTable items={data} />
    </div>
  );
};

function toUpperCamelCase(str: string) {
  return str
    .split(/[\s-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

export default HomePage;
