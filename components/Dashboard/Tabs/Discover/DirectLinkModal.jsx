"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Tooltip } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useCallback, useState } from "react";
import { debounce } from "@/constants/util";


const DirectLinkModal = ({ isOpen, onClose, handleAddVideo, searchVideoDetails }) => {
    const [videoLink, setVideoLink] = useState("");
    const debouncedSearch = useCallback(debounce(searchVideoDetails, 500), []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setVideoLink(value);
        if (value.trim()) {
            const videoId = getYouTubeVideoId(value);
            debouncedSearch(videoId);
        }
    };

    const handlePaste = () => {
        navigator.clipboard.readText().then((text) => {
            setVideoLink(text);
        });
    }

    const getYouTubeVideoId = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    return (
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Custom youtube link</ModalHeader>
                    <ModalBody>
                        <p> 
                            Enter the direct link to the video you want to add,
                            then hit enter.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                autoFocus
                                id="video-link"
                                label="Text"
                                placeholder="Enter youtube link"
                                variant="bordered"
                                onChange={handleInputChange}
                                value={videoLink}
                                endContent={
                                    <Icon
                                        className="pointer-events-none flex items-center text-default-400"
                                        icon="ri:youtube-fill"
                                        width={24}
                                    />
                                }
                            />
                            <Tooltip content="Paste">
                                <Button isIconOnly color="secondary" aria-label="VideoLink" variant="flat" size="lg" onClick={handlePaste}>
                                    <Icon icon="clarity:paste-line" width={24} />
                                </Button>
                            </Tooltip>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button color="primary" onPress={onClose}>
                            Save
                        </Button>
                    </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default DirectLinkModal