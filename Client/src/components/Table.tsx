import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchComponent from "./Search";

interface DataItem {
  ascii_name: string;
  cou_name_en: string;
  timezone: string;
}

export const TableWithSearch: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100"
        );
        setData(response.data.results);
        setFilteredData(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((dt) =>
        dt.ascii_name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <SearchComponent data={data} onSearch={handleSearch} />
        <table className="min-w-full divide-y mt-20 divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timezone
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/weather/${row.ascii_name}`}>
                    {row.ascii_name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {row.cou_name_en}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{row.timezone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
