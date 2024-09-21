"use client";

import { Input, Button, useDisclosure } from "@nextui-org/react"
import { Icon } from "@iconify/react"
import DirectLinkModal from "./DirectLinkModal"
import { useState, useCallback } from "react"

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const HeaderVideoSearch = ({ searchVideos, clearVideos, handleAddVideo, searchVideoDetails }) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useCallback(debounce(searchVideos, 500), []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      debouncedSearch(value);
    } else {
      clearVideos();
    }
  };

  return (
    <>
        <header className="flex w-full gap-4">
            <Input
              type="text"
              variant="bordered"
              label="Search videos..."
              value={searchQuery}
              onChange={handleInputChange}
              classNames={{
                  innerWrapper: "justify-center !items-center",
              }}
              endContent={
                <Icon
                  className="pointer-events-none flex items-center text-default-400"
                  icon="ri:search-line"
                  width={24}
                />
            }
            />
            <Button 
              isIconOnly 
              color="secondary" 
              aria-label="VideoLink" 
              variant="flat" 
              size="lg"
              onClick={onOpen}
            >
              <Icon icon="bi:link-45deg" width={24} />
            </Button> 
        </header>
        <DirectLinkModal 
          isOpen={isOpen} 
          onClose={onClose}
          handleAddVideo={handleAddVideo}
          searchVideoDetails={searchVideoDetails}
        />
    </>
  )
}

export default HeaderVideoSearch