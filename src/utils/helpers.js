// src/utils/helpers.js

/**
 * Format milliseconds to minutes:seconds format
 * @param {number} ms - Time in milliseconds
 * @returns {string} - Formatted time string (mm:ss)
 */
export const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  /**
   * Formats artist names into a readable string
   * @param {Array} artists - Array of artist objects
   * @returns {string} - Comma-separated list of artist names
   */
  export const formatArtistNames = (artists) => {
    if (!artists || artists.length === 0) return '';
    return artists.map(artist => artist.name).join(', ');
  };
  
  /**
   * Extracts Spotify playlist ID from various URL formats
   * @param {string} input - Playlist URL or ID string
   * @returns {string|null} - Spotify playlist ID or null if invalid
   */
  export const extractPlaylistId = (input) => {
    // If it's already just an ID (22 chars), return it
    if (input.length === 22 && /^[A-Za-z0-9]{22}$/.test(input)) {
      return input;
    }
    
    // Try to extract from URL
    const patterns = [
      /spotify:playlist:([A-Za-z0-9]{22})/, // Spotify URI
      /playlist\/([A-Za-z0-9]{22})/, // Web URL or app URL
      /playlist:([A-Za-z0-9]{22})/ // Alternative format
    ];
    
    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
  };
  
  /**
   * Creates a clean search query for YouTube based on track information
   * @param {string} trackName - Name of the track
   * @param {string} artistName - Name of the artist(s)
   * @returns {string} - Formatted search query
   */
  export const createSearchQuery = (trackName, artistName) => {
    // Remove featuring, ft., prod by, etc.
    let cleanTrackName = trackName
      .replace(/(feat\.|ft\.|featuring|prod\.| by |with).*/i, '')
      .replace(/\(.*?\)/g, '')
      .replace(/\[.*?\]/g, '')
      .trim();
      
    // Get just the primary artist if there are multiple
    let primaryArtist = artistName.split(',')[0].trim();
    
    return `${cleanTrackName} ${primaryArtist}`;
  };
  
  /**
   * Generates a Y2Mate download URL for a YouTube video
   * @param {string} youtubeId - YouTube video ID
   * @returns {string} - Y2Mate download URL
   */
  export const generateDownloadUrl = (youtubeId) => {
    if (!youtubeId) return null;
    // Return a Y2Mate URL that will allow downloading the video
    return `https://www.y2mate.com/youtube/${youtubeId}`;
  };
  
  /**
   * Truncates text with ellipsis if it exceeds maxLength
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length before truncation
   * @returns {string} - Truncated text
   */
  export const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
  };
  
  /**
   * Delay function for rate limiting API calls
   * @param {number} ms - Milliseconds to delay
   * @returns {Promise} - Promise that resolves after the delay
   */
  export const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  /**
   * Formats the number of tracks for display
   * @param {number} count - Number of tracks
   * @returns {string} - Formatted string
   */
  export const formatTrackCount = (count) => {
    return count === 1 ? '1 track' : `${count} tracks`;
  };