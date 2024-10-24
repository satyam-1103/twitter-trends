"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { frameworks } from "@/utils/common.js";
import { useCountry } from "@/context/countrySelect.js";
import { formatDistanceToNow } from "date-fns";
import { FiCopy } from "react-icons/fi";

const TableTrends = ({ selectedTrend }) => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedCountry } = useCountry(); // Get selected country from context
  const placeId = selectedCountry.placeId; // Use placeId from context
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date()); // Update the current time
    }, 60000); // 1 minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleCopy = (text, rank) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(rank); // Set the copied rank to show feedback
      setTimeout(() => setCopied(null), 2000); // Clear after 2 seconds
    });
  };

  const formatCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K"; // Format to one decimal place followed by "K"
    }
    return count; // Return the original count if less than 1000
  };

  const fetchTrends = async () => {
    if (!placeId) return; // Exit if placeId is not set
    try {
      const response = await fetch(
        `https://twitter-trends-backend-production.up.railway.app/api/trends/${placeId}` // Replace with your actual API endpoint
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trends");
      }
      const data = await response.json();
      setTrends(data.trending.trends); // Assuming the data structure based on your controller
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (placeId) {
      fetchTrends(); // Call fetchTrends when placeId is set
    }
  }, [placeId]); // Dependency on placeId

  if (loading) return <div>Loading trends...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Table>
        <TableCaption>
          Last Updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
        </TableCaption>
        <TableHeader className="bg-blue-200 p-2 ">
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Trends/Hashtag</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trends.map((trend) => (
            <TableRow key={trend.rank}>
              <TableCell className="font-medium">{trend.rank}</TableCell>
              <TableCell className="flex md:flex-row sm:flex-col gap-4 ">
                {trend.name}
                <span className="bg-gray-400 px-2 space-x-4 rounded-xl max-w-[75px] text-center font-bold">
                  {formatCount(trend.postCount)}
                </span>
              </TableCell>

              <TableCell className="text-right">
                <button
                  onClick={() => handleCopy(trend.name, trend.rank)}
                  className="flex items-center space-x-2 "
                >
                  <FiCopy className="mr-2" />
                  <span className="">
                    {copied === trend.rank ? "Copied!" : "Copy"}
                  </span>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableTrends;
