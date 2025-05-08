"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import useDebounce from "@/lib/useDebounce";
import { SearchIcon } from "lucide-react";

export default function TaskSearchBar() {
  const [searchText, setSearchText] = useState("");
  const debounceQuery = useDebounce(searchText);

  useEffect(() => {
    function searchTask() {
      // TODO: Search Logic goes here
    }
    searchTask();
  }, [debounceQuery]);
  return (
    <div className="relative max-w-4xl w-full sm:max-w-7xl">
      <Input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        className="pl-8"
        placeholder="Search task"
      />
      <SearchIcon className="absolute top-2 left-2 w-5 h-5" />
    </div>
  );
}
