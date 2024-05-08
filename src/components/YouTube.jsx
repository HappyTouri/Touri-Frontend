import React from "react";
import YouTube from "react-youtube";

function MyYouTube({ hotel_website }) {
  console.log(hotel_website);
  // Check if hotel_website is defined and is a string
  if (!hotel_website || typeof hotel_website !== "string") {
    // Handle the case where hotel_website is not valid
    return <div>Invalid YouTube URL</div>;
  }

  // Function to extract video ID from a YouTube URL
  const extractVideoIdFromUrl = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1]; // Return the video ID (first capturing group)
    }
    return null; // Return null if no match
  };

  // Extract the video ID from the current video URL
  const videoId = extractVideoIdFromUrl(hotel_website);

  // Options for the YouTube player
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0, // Auto-play the video on load (0 = false, 1 = true)
    },
  };

  // Event handler for when the video ends
  const onVideoEnd = (event) => {
    // Add your event handling code here
    console.log("Video has ended.");
  };

  return <YouTube videoId={videoId} opts={opts} onEnd={onVideoEnd} />;
}

export default MyYouTube;
